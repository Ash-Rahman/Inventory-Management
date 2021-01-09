import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DaysCompleted from "../Components/DaysCompleted";
import Checkin from "../Components/Checkin";
import avatarPlaceHolder from "../assets/avatar_placeholder.png"
import * as dayjs from 'dayjs';


function Dash(props) {

  const { user, readCheckins,readChallenges, createComment, readComments} = props;
  const [allCheckins, setAllCheckins] = useState([]);
  const [daysComplete, setDaysComplete] = useState(0);
  const [percentageComplete, setPercentageComplete] = useState(0);

   const handleComment = async (checkinId, comment) => {

    await createComment(checkinId, comment);

   }

  useEffect(() => {

    const getAllCheckins =  async () => {
      const aCheckins =  await readCheckins();
      let checkins = [];
      aCheckins.forEach(c => checkins.push({...c.data(),...{id:c.id} }));
      setAllCheckins(checkins)
    }

    const getAllChallenges = async () => {
      const aChallenges = await readChallenges();
      let challenges = [];
      aChallenges.forEach(c => challenges.push(c.data()));
      // using the daysjs libary to work out the days to the end of the challenge
      const now =  dayjs();
      const start = dayjs(challenges[0].start.toDate());
      const end = dayjs(challenges[0].end.toDate());
      const totalDays = end.diff(start, 'day');
      const daysCompleted = now.diff(start, 'day');
      const percentageComplete = (parseInt(daysCompleted) / parseInt(totalDays)) * 100;

      setDaysComplete(daysCompleted);
      setPercentageComplete(Math.round(percentageComplete));

      }

    getAllCheckins();
    getAllChallenges();



  }, [])



  return (
    <div>

      <DaysCompleted days={daysComplete} percentageComplete={percentageComplete}  checkins={allCheckins.filter(c => c.userId === user.uid)}/>


      {
        allCheckins.map( (c) => <Checkin onComment={handleComment} userProfilePicture={user.photoURL || avatarPlaceHolder}  user={user} checkin={c} readComments={readComments} />)
      }



    </div>
  );
}

Dash.propTypes = {
    checkins: PropTypes.array.isRequired,
    readCheckins: PropTypes.object.isRequired
};

export default Dash;


