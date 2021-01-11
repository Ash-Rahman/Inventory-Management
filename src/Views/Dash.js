import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DaysCompleted from "../Components/DaysCompleted";
import Item from "../Components/Item";
import avatarPlaceHolder from "../assets/avatar_placeholder.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as dayjs from 'dayjs';


function Dash(props) {

  const { user, readCheckins, readChallenges, createComment, readComments } = props;
  const [allCheckins, setAllCheckins] = useState([]);
  const [daysComplete, setDaysComplete] = useState(0);
  const [percentageComplete, setPercentageComplete] = useState(0);

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

    getAllCheckins();
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
  color: ${ props => props.theme.colors.purple};
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
    textarea {
        border-radius: 4px;
        border: 1px solid ${({ theme }) => theme.colors.darkShade[25]};
    }`;

  let itemID = 0;
  //console.log(JSON.stringify(allCheckins));
  return (
    <div>
      <StyledHeading> Your Checked-Out Items! </StyledHeading>
      {

          <StyledDetailsArea>
          {
            allCheckins.filter(c => c.owner === user.email).map( (c) =>

                <Item onComment={handleComment} userProfilePicture={user.photoURL || avatarPlaceHolder}  user={user} checkin={c}  readComments={readComments}/>

            )
          }
          </StyledDetailsArea>

      }
      {/* //allCheckins.filter(c => c.owner === user.email) */}
      <StyledHeading> All Items </StyledHeading>
      {
         <StyledDetailsArea>
         {/* //allCheckins.filter(c => c.owner === user.email) */}
         {
            allCheckins.filter(c => c.owner != user.email).map( (c) =>

              <Item onComment={handleComment} userProfilePicture={user.photoURL || avatarPlaceHolder}  user={user} checkin={c}  readComments={readComments}/>

            )
         }
         </StyledDetailsArea>
      }

      {/* <StyledButton>
        <Link to={{pathname: '/updateItem', state: {id: itemID}}}> Update Item </Link>
      </StyledButton>
      <StyledButton>
        <Link to="/createItem"> History </Link>
      </StyledButton> */}

    </div>
  );
}

Dash.propTypes = {
    checkins: PropTypes.array.isRequired,
    readCheckins: PropTypes.object.isRequired
};

export default Dash;


