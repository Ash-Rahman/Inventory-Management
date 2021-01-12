import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DaysCompleted from "../Components/DaysCompleted";
import Item from "../Components/Item";
import avatarPlaceHolder from "../assets/avatar_placeholder.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import * as dayjs from 'dayjs';


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


  const StyledButton = styled.button`
  height: 44.63px;
  background: linear-gradient(180deg, #bc9cff 0%, #8ba4f9 100%);
  border-radius: 22px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: right;
  cursor: pointer;
  width: 100%;
  margin-top: 6%;
  border: none;
`;

  const StyledHeading = styled.h2`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  color: ${ props => props.theme.colors.white};
  `;

  const FlexContainer = styled.div`
    display: flex;
  `;

  const FlexChild = styled.div`
  flex: 1;
  border: 2px solid yellow;
  width: 30%;
  justify-content: center;
  align-items: center;
  h6:nth-child(2) {
    margin-top: 30%
  },
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

  let itemID = 0;
  //console.log(JSON.stringify(allCheckins));
  return (
    <div>
      <StyledHeading> Current Item State </StyledHeading>
      {console.log("2222: ", allCheckins)}
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


