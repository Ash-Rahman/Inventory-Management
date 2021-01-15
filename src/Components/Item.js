import React, {useState, useEffect} from "react";
import moment from "moment";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";

  const StyledSpan = styled.span`
    color: ${({ theme }) => theme.colors.purple};
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

 const StyledH6 = styled.h6`
  color: ${({ theme }) => theme.colors.white};
  padding-bottom: 4px;
`;

const StyledH6Underlined = styled.h6`
  color: ${({ theme }) => theme.colors.white};
  textDecorationLine: Underline;
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

          <StyledH6Underlined> Owned by: </StyledH6Underlined>
          <StyledH6>{checkin.owner}</StyledH6>

          <StyledH6Underlined>Time</StyledH6Underlined>
          <StyledH6>{moment(checkin.time.toDate()).format('ll')}</StyledH6>

          <StyledH6Underlined>Item Type</StyledH6Underlined>
          <StyledH6>{checkin.type}</StyledH6>

          <StyledH6Underlined>Item Name</StyledH6Underlined>
          <StyledH6>{checkin.name}</StyledH6>

          <StyledH6Underlined>Item Description</StyledH6Underlined>
          <StyledH6>{checkin.description}</StyledH6>

          <StyledH6Underlined>Item Unique Identifier</StyledH6Underlined>
          <StyledH6>{checkin.uniqueIdentifier}</StyledH6>

          <StyledH6Underlined>Item Location</StyledH6Underlined>
          <StyledH6>{checkin.location}</StyledH6>

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

Item.propTypes = {
  checkin: PropTypes.object.isRequired,
  onComment: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  updateCurrentItem: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};



export default Item;
