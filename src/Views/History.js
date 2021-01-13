import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DaysCompleted from "../Components/DaysCompleted";
import Item from "../Components/Item";
import avatarPlaceHolder from "../assets/avatar_placeholder.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import * as dayjs from 'dayjs';

import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

function History(props) {

  const {user, readCheckins, readChallenges, createComment, readComments, getCheckinById } = props;
  const [allCheckins, setAllCheckins] = useState([]);
  const [checkin, setCheckin] = useState(0)
  const [allItemHistory, setAllItemHistory] = useState([]);
  const [daysComplete, setDaysComplete] = useState(0);
  const [percentageComplete, setPercentageComplete] = useState(0);


  const location = useLocation();
  // setCheckin(location.query.checkin.id);

   const handleComment = async (checkinId, comment) => {

    await createComment(checkinId, comment);

   }

  //  const handleItemUpdate = async (checkinId, data) => {

  //   await updateCheckin(checkinId, data);

  //  }

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
      const aHistory =  await readComments(location.query.id);
      let items = [];
      aHistory.forEach(c => items.push({...c.data(),...{id:c.id} }));
      setAllItemHistory(items)
    }

    // const getAllChallenges = async () => {
    //   const aChallenges = await readChallenges();
    //   let challenges = [];
    //   aChallenges.forEach(c => challenges.push(c.data()));
    //   // using the daysjs libary to work out the days to the end of the challenge
    //   const now =  dayjs();
    //   const start = dayjs(challenges[0].start.toDate());
    //   const end = dayjs(challenges[0].end.toDate());
    //   const totalDays = end.diff(start, 'day');
    //   const daysCompleted = now.diff(start, 'day');
    //   const percentageComplete = (parseInt(daysCompleted) / parseInt(totalDays)) * 100;

    //   setDaysComplete(daysCompleted);
    //   setPercentageComplete(Math.round(percentageComplete));

    //   }

    getAllHistory();
    //getAllChallenges();
  }, [])

  const StyledHeading = styled.h2`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${ props => props.theme.colors.white};
  `;

  const StyledDetailsArea = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-column-gap: 5%;
    grid-row-gap: 40px;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    textarea {
        border-radius: 4px;
        border: 1px solid ${({ theme }) => theme.colors.darkShade[25]};
    }`;

  const StyledButton = styled.button`
    height: 44.63px;
    max-width: 162px;
    margin-left: 20px;
    background: ${({ theme }) => theme.colors.blue};
    border-radius: 22px;
    color: white;
    display: flex-end;
    width: 30%;
    justify-content: center;
    align-items: right;
    cursor: pointer;
    border: none;
  `;

  let itemID = 0;

  //console.log(JSON.stringify(allCheckins));
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
                      readComments={readComments} createComment={createComment}
                />
            )

          }

          </StyledDetailsArea>
      }
      {/* //allCheckins.filter(c => c.owner === user.email) */}
      <StyledHeading> Item History </StyledHeading>

         <StyledDetailsArea>
         {
            allItemHistory.map( (c) =>
              <Item onComment={handleComment} user={user} checkin={c}
                    readComments={readComments} createComment={createComment}
              />
            )
         }
         </StyledDetailsArea>
    </div>
  );
}

History.propTypes = {
    checkins: PropTypes.array.isRequired,
    readCheckins: PropTypes.object.isRequired,
    readComments: PropTypes.object.isRequired,
    checkin: PropTypes.object.isRequired,
};

export default History;


