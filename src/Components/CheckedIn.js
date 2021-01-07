
import React from 'react';
import thumbsUp from "../assets/thumbs-up.svg";
import styled from 'styled-components';


const StyledThumbsUp = styled.div`
  background: url(${thumbsUp}) no-repeat left top;
  width: 150px;
  height: 150px;
`;

const StyledCheckedIn = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #6FCF97 0%, #66D2EA 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

const CheckedIn = ({runningStreak}) => (
<StyledCheckedIn >
        <StyledThumbsUp />
<h4> All checked-in! You’re on a {runningStreak} day run! </h4> 
</StyledCheckedIn>);


CheckedIn.defaultProps = {
  runningStreak: 0
}

export default CheckedIn;