import React, { useState } from "react";
import PropTypes from "prop-types";
import Tile from "../Components/Tile";
import styled from "styled-components";
import UpdateItemForm from "../Components/UpdateItemForm";
import Loader from "../Components/Loader"
import thumbsUp from "../assets/thumbs-up.svg";
import { useHistory, useLocation } from "react-router-dom";


const StyledTile = styled(Tile)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  grid-row-gap: 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.darkBlue};
`;

const StyledHeading = styled.h4`
  text-align: center;
  margin-top: 2%;
  color: #ffffff;
`;


const UpdateItem = (props) => {
  const { user, updateCurrentItem, getCheckinById, createItemHistory } = props;
  const location = useLocation();
  const [checkedIn, setCheckedIn] = useState(false);
  const [item, setItemValue] = useState(0);
  const [itemHistory, setItemHistory] = useState(0);
  const [gotItem, setGotItem] = useState(false);
  let history = useHistory();

  if (location.query && !gotItem) {
    console.log("query1: ", JSON.stringify(location.query));
    const getItem = async () => {
      const aItem = await getCheckinById(location.query.id);
      console.log("query2: ", location.query);
      let item = aItem.data();
      console.log("item: ", item);
      setItemValue(item);
      setItemHistory(item);
      setGotItem(true);
    }
    getItem()
  }

  const handleSubmit = async (checkin) => {
    // See what the user did during the item update and alter a few values based on some of their choices.
    setCheckedIn(true);
    // if user selects owner as me, set the new owner of item as the logged in user.
    if(checkin.owner == "Me" || checkin.owner == "") {
      checkin.owner = user.email;
      checkin.action = "CheckedInItem";
    }
    // if the user selects 'keep same' as owner keep owner the same.
    if(checkin.owner == "Keep Same") {
      checkin.owner = item.owner;
      checkin.action = "UpdatedItemInfo";
    }
    if(checkin.owner == "None") {
      checkin.owner = "None";
      checkin.action = "UpdatedItemInfo";
    }

    const ckin = {
      ...checkin,
      ...{
        userId: user.uid,
        userName: user.displayName || user.email,
        time: new Date(),
      },
    };
    //Create a history entry to remember the status of an item after an update.
    await createItemHistory(location.query.id, itemHistory);
    await updateCurrentItem(location.query.id, ckin);
    setTimeout(() => history.push('/'), 3000);
  };

  //console.log("item" + JSON.stringify(item));
  return (
    <React.Fragment>
      {gotItem && !checkedIn ? (
        <StyledTile>
          <StyledHeading> Edit Item </StyledHeading>
          <UpdateItemForm onSubmit={handleSubmit} item={item} />
        </StyledTile>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

UpdateItem.propTypes = {
  user: PropTypes.object.isRequired,
  updateCurrentItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  readCheckins: PropTypes.object.isRequired,
  getCheckinById: PropTypes.object.isRequired,
};

export default UpdateItem;