import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Item from "../Components/Item";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import * as dayjs from 'dayjs';

import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

function History(props) {

  const {user, readCheckins, readChallenges, createItemHistory, readItemHistory, getCheckinById } = props;
  const [allCheckins, setAllCheckins] = useState([]);
  const [allItemHistory, setAllItemHistory] = useState([]);

  const location = useLocation();

   const handleComment = async (checkinId, comment) => {

    await createItemHistory(checkinId, comment);

  }

  useEffect(() => {
    const getAllCheckins =  async () => {
      const aCheckins =  await readCheckins();
      let checkins = [];
      aCheckins.forEach(c => checkins.push({...c.data(),...{id:c.id} }));
      setAllCheckins(checkins)
    }
    getAllCheckins();
  }, [])

  useEffect(() => {
    const getAllHistory =  async () => {
      const aHistory =  await readItemHistory(location.query.id);
      let items = [];
      aHistory.forEach(c => items.push({...c.data(),...{id:c.id} }));
      setAllItemHistory(items)
    }

    getAllHistory();
    //getAllChallenges();
  }, [])

  const StyledHeading = styled.h2`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${ props => props.theme.colors.white};
  padding-bottom: 20px;
  `;

  const StyledDetailsArea = styled.div`
    display: grid;
    grid-template-columns: 2fr;
    grid-column-gap: 5%;
    grid-row-gap: 40px;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    @media (min-width: 500px) {
      grid-template-columns: 2fr 2fr;
    };
    @media (min-width: 800px) {
      grid-template-columns: 2fr 2fr 2fr;
    };
    @media (min-width: 1250px) {
      grid-template-columns: 2fr 2fr 2fr 2fr;
    };
    textarea {
        border-radius: 4px;
        border: 1px solid ${({ theme }) => theme.colors.darkShade[25]};
    }`;

  const StyledButton = styled.button`
    height: 44.63px;
    max-width: 162px;
    margin-left: 20px;
    background: ${({ theme }) => theme.colors.buttonYellow};
    border-radius: 22px;
    color: white;
    display: flex-end;
    width: 30%;
    justify-content: center;
    align-items: right;
    cursor: pointer;
    border: none;
  `;

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(12);

    const title = "Item History";
    const headers = [["Type", "Name", "Unique Identifier", "Description", "Location", "Action", "Owner", "Time"]];

    // const data = this.state.people.map(elt=> [elt.name, elt.profession]);
    const data = allItemHistory.map( (c) =>
      [c.type, c.name, c.uniqueIdentifier, c.description, c.location, c.action, c.owner, moment(c.time.toDate()).format('ll')]
    )

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }

  return (
    <div>
        <StyledHeading>
          Current Item State
          <StyledButton onClick={() => exportPDF()}>Export to PDF</StyledButton>
        </StyledHeading>
      {
          <StyledDetailsArea>
          {
            allCheckins.filter(c => c.id === location.query.id).map( (c) =>

                <Item onComment={handleComment} user={user} checkin={c}
                      readItemHistory={readItemHistory} createItemHistory={createItemHistory}
                />
            )

          }

          </StyledDetailsArea>
      }
      <StyledHeading> Item History </StyledHeading>
      {
        allItemHistory.length > 0 ?
           <StyledDetailsArea>
           {
              allItemHistory.map( (c) =>
                <Item onComment={handleComment} user={user} checkin={c}
                      readItemHistory={readItemHistory} createItemHistory={createItemHistory} forHistory={true}
                />
              )
           }
           </StyledDetailsArea>
        : <StyledHeading> No results </StyledHeading>
      }
    </div>
  );
}

History.propTypes = {
    checkins: PropTypes.array.isRequired,
    readCheckins: PropTypes.object.isRequired,
    readItemHistory: PropTypes.object.isRequired,
    checkin: PropTypes.object.isRequired,
};

export default History;


