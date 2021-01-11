import React, {useState, useEffect} from "react";
import avatarPlaceHolder from "../assets/avatar_placeholder.png"
import moment from "moment";
import PropTypes from "prop-types";
import Tile from "./Tile";
import styled from "styled-components";
import avatarSmall from "../assets/avatar_small.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import ItemButton from "../Components/ItemButton";
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


  const InfoArea = styled.div`
   border-radius: 15px;
   background-color: ${({ theme }) => theme.colors.grey};
   width: 100%;
   margin-top: 2%;
   margin-bottom: 2%;
   min-height: 80px;
   min-width: 230px;
   padding 3%;
   h6:nth-child(2) {
       margin-top: 5%
   },
  `;
  // h6:nth-child(2) {
  //   margin-right: 5%
  // },
  const InfoArea2 = styled.div`
  border-radius: 15px;
  width: 30%;
  background-color: ${({ theme }) => theme.colors.grey};
  min-height: 80px;
  min-width: 230px;
  padding 3%;
  margin-left: 10px;
  margin-top: 1%;
 `;

function Item(props) {

 const {checkin,  userProfilePicture, user, onComment, readComments} = props;
 const [comment, setComment]= useState("");
 const [comments, setComments]= useState([]);
 const [itemHistory, setItemHistory] = useState(0);
 const [item, setItemValue] = useState(0);

 const readAllComment = async () => {
  const commentsRef =  await readComments(checkin.id);
  const comments = [];
  commentsRef.forEach(c => {comments.push(c.data())});
   setComments(comments);
 }
 useEffect(() => {
   readAllComment();
 }, [])

//  setItemHistory(checkin);

//   const handleSubmit = async (checkin) => {
//     const ckin = {
//       ...checkin,
//       ...{
//         userId: user.uid,
//         userName: user.displayName || user.email,
//         time: new Date(),
//       },
//     };
//     await createComment(checkin.id, itemHistory);
//     await updateCurrentItemUser(checkin.id, ckin);
//     setTimeout(() => history.push('/'), 3000);
//   };

//  const handleKeyPress = (e) => {

//     if(e.key === 'Enter' && comment) {
//       const commentRecord =   {
//         userId: user.uid,
//         userName: user.displayName || user.email,
//         message: comment,
//         time: new Date(),
//       }
//       onComment(checkin.id, commentRecord);
//       setComment("");
//       // refresh comments
//       readAllComment();
//     }

//  }
  //console.log(JSON.stringify(checkin));

  return (


        <InfoArea2>
          <h6>
            <StyledSpan> Owned by: </StyledSpan>
          </h6>

          <h6>{checkin.owner}</h6>


          <h6>Time</h6>
          {moment(checkin.time.toDate()).format('ll')}

          <h6>Item Type</h6>
          {checkin.type}

          <h6>Item Name</h6>
          {checkin.name}

          <h6>Item Description</h6>
          {checkin.description}

          <h6>Item Unique Identifier</h6>
          {checkin.uniqueIdentifier}

          <h6>Item Location</h6>
          {checkin.location}

          <StyledButton>
            <Link to={{pathname: '/updateItem', query: {id: checkin.id}}}> Update Item </Link>
          </StyledButton>
          <StyledButton>
            <Link to={{pathname: '/history', query: {id: checkin.id}}}> History </Link>
          </StyledButton>
          {/* <StyledButton>
            <ItemButton > Check Out </ItemButton>
          </StyledButton> */}
        </InfoArea2>


  );
}

Item.propTypes = {
  checkin: PropTypes.object.isRequired,
  onComment: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};



export default Item;
