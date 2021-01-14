import React, {useState, useEffect} from "react";
import avatarPlaceHolder from "../assets/avatar_placeholder.png"
import moment from "moment";
import PropTypes from "prop-types";
import Tile from "./Tile";
import styled from "styled-components";
import avatarSmall from "../assets/avatar_small.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Histogram from "./Histogram";

function LikeButton(props) {
  const StyledDiv = styled.div`
    border-radius: 11px;
    border: 1px solid ${({ theme }) => theme.colors.purple};
    width: 40px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.purple};
  `;

  return (
    <StyledDiv>
      <h6>
        <FontAwesomeIcon style={{ fontSize: "12px" }} icon={faHeart} /> 12{" "}
      </h6>
    </StyledDiv>
  );
}

const StyledDetailsArea = styled.div`
    display: grid;
    grid-template-columns: 0.2fr 3fr;
    textarea {
        border-radius: 4px;
        border: 1px solid ${({ theme }) => theme.colors.darkShade[25]};
    }`;

  const StyledSpan = styled.span`
    color: ${({ theme }) => theme.colors.purple};
  `;

  const StyledPhotoArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justifyContent: 'flex-start',
  `;

  const StyledCheckinArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    min-height: 190px;
  `;

  const StyledScoreArea = styled.div`

    display: flex;
    flex-direction: row;
    h3 {
      color: ${({ theme }) => theme.colors.purple};
    },`;

  const StyledDivider = styled.hr`
    border: 0.3px solid ${({ theme }) => theme.colors.darkShade[5]};
    width: 100%;
  `;

  const CommentArea = styled.div`

   border-radius: 15px;
   background-color: ${({ theme }) => theme.colors.grey};
   width: 95%;
   margin-top: 2%;
   margin-bottom: 2%;
   min-height: 80px;
   padding 3%;
   h6:nth-child(2) {
       margin-top: 5%
   },


  `;

function Checkin(props) {

 const {checkin,  userProfilePicture, user, onComment, readItemHistory} = props;
 const [comment, setComment]= useState("");
 const [comments, setComments]= useState([]);

 const readAllComment = async () => {
  const commentsRef =  await readItemHistory(checkin.id);
  const comments = [];
  commentsRef.forEach(c => {comments.push(c.data())});
   setComments(comments);
 }
 useEffect(() => {
   readAllComment();
 }, [])

 const handleKeyPress = (e) => {

    if(e.key === 'Enter' && comment) {
      const commentRecord =   {
        photo: user.photoURL || avatarPlaceHolder,
        userId: user.uid,
        userName: user.displayName || user.email,
        message: comment,
        time: new Date(),
      }
      onComment(checkin.id, commentRecord);
      setComment("");
      // refresh comments
      readAllComment();
    }

 }

  return (
    <Tile elevation="0.06">
      <StyledDetailsArea>
        <StyledPhotoArea>
          <img
            src={checkin.photo}
            style={{  marginBottom: 10, marginRight: 10, width: "50px", height: "50px",     borderRadius: '50%'  }}
            alt="avatar"
          />
          <LikeButton></LikeButton>
        </StyledPhotoArea>

        <StyledCheckinArea>
          <h6>
            {checkin.userName} <StyledSpan> Checked In </StyledSpan>
          </h6>
          <em> {moment(checkin.time.toDate()).fromNow()} </em> <h6>{checkin.comment}</h6>
          <h6> Total</h6>
          <StyledScoreArea>
            {" "}
            <h3>{checkin.total}</h3>{" "}
            <div style={{ width: "100%", height: "90%" }}>
              <Histogram barCount={7} bars={[10, 10, 10, 10, 10, 10, 10]} />
            </div>
          </StyledScoreArea>
        </StyledCheckinArea>
      </StyledDetailsArea>
      <StyledDivider />

     {
       comments.map((c, i) => (<StyledDetailsArea>
        <img
          src={c.photo}
          style={{  marginBottom: 10, marginRight: 10, width: "50px", height: "50px",     borderRadius: '50%'}}
          alt="avatar"
        />

        <CommentArea>

          <h6>
            {c.userName} <em>  {moment(c.time.toDate()).fromNow()} </em>
          </h6>

        <h6> {c.message}</h6>
        </CommentArea>
      </StyledDetailsArea>))
     }




      <StyledDetailsArea>
        <img
          src={userProfilePicture}
          style={{  marginBottom: 10, marginRight: 10, width: "50px", height: "50px",     borderRadius: '50%'}}
          alt="avatar"
        />

        <textarea rows="4"
                  onChange={e => setComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  value={comment}
        >

        </textarea>



      </StyledDetailsArea>
    </Tile>
  );
}

Checkin.propTypes = {
  checkin: PropTypes.object.isRequired,
  onComment: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,

};



export default Checkin;
