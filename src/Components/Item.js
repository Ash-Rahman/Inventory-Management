import React, {useState, useEffect} from "react";
import avatarPlaceHolder from "../assets/avatar_placeholder.png"
import moment from "moment";
import PropTypes from "prop-types";
import Tile from "./Tile";
import styled from "styled-components";
import avatarSmall from "../assets/avatar_small.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import ItemButton from "../Components/ItemButton";
import Histogram from "./Histogram";

const StyledDetailsArea = styled.div`
    display: grid;
    grid-template-columns: 0.2fr 3fr;
    color: #252F36;

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

  const StyledButtonBlue = styled.button`
  height: 44.63px;
  background: ${({ theme }) => theme.colors.buttonBlue};
  border-radius: 22px;
  color: white;
  justify-content: center;
  align-items: right;
  cursor: pointer;
  width: 100%;
  margin-top: 6%;
  border: none;
`;


const StyledButtonYellow = styled.button`
height: 44.63px;
background: ${({ theme }) => theme.colors.buttonYellow};
border-radius: 22px;
color: white;
justify-content: center;
align-items: right;
cursor: pointer;
width: 100%;
margin-top: 6%;
border: none;
`;


const StyledButtonGreen = styled.button`
  height: 44.63px;
  background: ${({ theme }) => theme.colors.buttonGreen};
  border-radius: 22px;
  color: white;
  justify-content: center;
  align-items: right;
  cursor: pointer;
  width: 100%;
  margin-top: 6%;
  border: none;
`;


const StyledButtonRed = styled.button`
  height: 44.63px;
  background: ${({ theme }) => theme.colors.buttonRed};
  border-radius: 22px;
  color: white;
  justify-content: center;
  align-items: right;
  cursor: pointer;
  width: 100%;
  margin-top: 6%;
  border: none;
`;

  const StyledLink = styled(Link)`
    height: 44.63px;

    border-radius: 22px;
    color: white;
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
  background-color: ${({ theme }) => theme.colors.lightBlue};
  min-height: 80px;
  min-width: 230px;
  padding 3%;
  margin-left: 10px;
  margin-top: 1%;
 `;

function Item(props) {

  const {checkin, user, readItemHistory, updateCurrentItem, createItemHistory, forHistory} = props;
  const [comment, setComment]= useState("");
  const [comments, setComments]= useState([]);
  const [itemHistory, setItemHistory] = useState(checkin);
  const [currentItem, setCurrentItem] = useState(checkin);
  const [isForHistory, setIsForHistory] = useState(false);
  const [userOwnsItem, setUserOwnsItem] = useState(false);

  const readAllComment = async () => {
    const commentsRef =  await readItemHistory(checkin.id);
    const comments = [];
    commentsRef.forEach(c => {comments.push(c.data())});
     setComments(comments);
  }
  useEffect(() => {
   readAllComment();
   if(checkin.owner.trim() == user.email.trim()) {
    setUserOwnsItem(true);
   }
   if(forHistory) {
    setIsForHistory(true);
   }
  }, [])

  let history = useHistory();

  const handleCheckoutUpdate = async () => {
    let newItem = currentItem;

    //See if the user is checkingIn or CheckingOut the item
    if(newItem.owner.trim() == user.email.trim()) {
      newItem.owner =  "None";
      newItem.action = "CheckedIn";
    } else {
      newItem.owner = user.email;
      newItem.action = "CheckedOut";
    }

    const ckin = {
      ...newItem,
      ...{
        userId: user.uid,
        userName: user.displayName || user.email,
        time: new Date(),
      },
    };
    await createItemHistory(checkin.id, itemHistory);
    await updateCurrentItem(checkin.id, ckin);
    setTimeout(() => history.push('/'), 3000);
  };

  return (
        <InfoArea2>
          <h6>
            <StyledSpan> Owned by: </StyledSpan>
            {checkin.owner}
          </h6>

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


          {!isForHistory &&
            <React.Fragment>
              <StyledButtonBlue>
                <StyledLink to={{pathname: '/updateItem', query: {id: checkin.id}}}> Update Item </StyledLink>
              </StyledButtonBlue>

              <StyledButtonYellow>
                <StyledLink to={{pathname: '/history', query: {id: checkin.id}}}> History </StyledLink>
              </StyledButtonYellow>
              {!userOwnsItem ?
                <StyledButtonGreen onClick={handleCheckoutUpdate}>
                  Checkout
                </StyledButtonGreen>
               :
                <StyledButtonRed onClick={handleCheckoutUpdate}>
                  Checkin
                </StyledButtonRed>
              }
            </React.Fragment>
          }
        </InfoArea2>
  );
}

// {!isForHistory ? (
//   <React.Fragment>
//   <StyledButton>
//     <Link to={{pathname: '/updateItem', query: {id: checkin.id}}}> Update Item </Link>
//   </StyledButton>
//   <StyledButton>
//     <Link to={{pathname: '/history', query: {id: checkin.id}}}> History </Link>
//   </StyledButton>
//   <StyledButton onClick={handleCheckoutUpdate}>
//     Checkin/Checkout
//   </StyledButton>
//   </React.Fragment>
// ): (<React.Fragment></React.Fragment>)}

Item.propTypes = {
  checkin: PropTypes.object.isRequired,
  onComment: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  updateCurrentItem: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};



export default Item;
