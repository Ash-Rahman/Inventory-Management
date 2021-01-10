import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import avatarLarge from "../assets/avatar_small.png";
import avatarPlaceholder from "../assets/avatar_placeholder.png";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";


const StyledNav = styled.nav`
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledLi = styled.li`
  margin-bottom: 10%;
  cursor: pointer;
  width: 100%;
  text-align: center;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, active }) =>
    active ? theme.colors.blue : ""};
`;

const StyledClosedText = styled.p`
  text-align: right;
  padding-right: 3%;
  margin-bottom: 15%;
  font-size: 18px;
  cursor: pointer;
`;

function Menu(props) {
  const { onClick } = props;
  const location = useLocation();

  return (
    <div>
      <StyledClosedText onClick={onClick}> X </StyledClosedText>
      <StyledNav>
        <ul>
          <StyledLi active={location.pathname === "/"}>
            {" "}
            <Link to="/"> Dash </Link>{" "}
          </StyledLi>
          <StyledLi active={location.pathname === "/profile"}>
            {" "}
            <Link to="/profile"> Profile </Link>{" "}
          </StyledLi>
          <StyledLi active={location.pathname === "/checkin"}>
            {" "}
            <Link to="/checkin"> Checkin </Link>{" "}
          </StyledLi>
          <StyledLi active={location.pathname === "/createItem"}>
            {" "}
            <Link to="/createItem"> Add Item </Link>{" "}
          </StyledLi>
          <StyledLi active={location.pathname === "/updateItem"}>
            {" "}
            <Link to="/updateItem"> Edit Item </Link>{" "}
          </StyledLi>
        </ul>
      </StyledNav>
    </div>
  );
}

Menu.propTypes = {
  onClick: PropTypes.func.isRequired
};


const StyledBurgerMenu = styled.div`
width: 90px;
cursor: pointer;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
hr {
  margin: 4px 0 0 4px;
  width: 20%;
  border: 1px solid ${({ theme }) => theme.colors.blue};
}
`;

const StyledUserAvatar = styled.div`
color: ${({ theme }) => theme.colors.blue};
display: flex;
width: 80%;
align-items: center;
justify-content: flex-end;
img {
  margin-top: 8%;
  margin-bottom: 2%;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 2%
}
`;

const StyledMenuWrapper = styled.div`
transition: all 0.5s ease-in-out;
transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
height: 100vh;
width: 304px;
background: linear-gradient(180deg, #6fcf9d 0%, #67d2e8 100%);
position: absolute;
padding-top: 1%;
top: 0;
left: 0;
`;

const StyledWrapper = styled.div`
width: 100%;
background: linear-gradient(
  180deg,
  ${({ theme }) => theme.colors.lightBlue} 0%,
  ${({ theme }) => theme.colors.blue} 100%
);
height: 50px;
display: flex;
justify-content: space-between;
`;

function Header(props) {
  const { onClick, open, user, signOut } = props;

  const handleClick = e => {
    e.preventDefault();
    onClick(e);
  };

  const handleSignOutClick = () => {
    signOut();

  }

  return (
    <div>
      <StyledMenuWrapper open={open}>
        <Menu onClick={handleClick} />
      </StyledMenuWrapper>

      <StyledWrapper>
        <StyledBurgerMenu onClick={handleClick}>
          <hr />
          <hr />
          <hr />
        </StyledBurgerMenu>
        <StyledUserAvatar>
          {/* <FontAwesomeIcon style={{ fontSize: "16px" }} icon={faChevronDown} /> */}
          <h6> {user.email}  <span style={{textDecoration: "underline", cursor:"pointer"}} onClick={handleSignOutClick}> (logout) </span></h6>
          <img src={user.photoURL || avatarPlaceholder} alt="avatar" />
        </StyledUserAvatar>
      </StyledWrapper>
    </div>
  );
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired

};

export default Header;
