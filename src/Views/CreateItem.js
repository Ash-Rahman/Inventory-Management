import React, { useState } from "react";
import PropTypes from "prop-types";
import Tile from "../Components/Tile";
import styled from "styled-components";
import AddItemForm from "../Components/AddItemForm";
import thumbsUp from "../assets/thumbs-up.svg";
import Loader from "../Components/Loader";
import { useHistory } from "react-router-dom";

const StyledCheckedIn = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #6fcf97 0%, #66d2ea 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

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

const StyledThumbsUp = styled.div`
  background: url(${thumbsUp}) no-repeat left top;
  width: 150px;
  height: 150px;
`;

const CreateItem = (props) => {
  const { user, createCheckin } = props;
  const [checkedIn, setCheckedIn] = useState(false);
  let history = useHistory();

  const handleSubmit = async (checkin) => {
    setCheckedIn(true);

    const ckin = {
      ...checkin,
      ...{
        userId: user.uid,
        userName: user.displayName || user.email,
        time: new Date(),
      },
    };
    await createCheckin(ckin);
    setTimeout(() => history.push('/'), 3000);
  };

  return (
    <React.Fragment>
      {!checkedIn ? (
        <StyledTile>
          <StyledHeading> Add New Item </StyledHeading>
          <AddItemForm onSubmit={handleSubmit} />
        </StyledTile>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

CreateItem.propTypes = {
  user: PropTypes.object.isRequired,
  createCheckin: PropTypes.func.isRequired,

};

export default CreateItem;
