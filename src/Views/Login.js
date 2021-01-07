import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Tile from "../Components/Tile";
import { Link } from "react-router-dom";
import Form from "../Components/LoginForm";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
`;

const StyledTile = styled(Tile)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  grid-row-gap: 20px;
  width: 100%;
  @media (min-width: 600px) {
    width: 30%;
  }
`;

const StyledHeading = styled.h2`
  text-align: center;
  margin-top: 2%;
  color: ${({ theme }) => theme.colors.purple};
`;
const StyledLink = styled(Link)`
  text-align: center;
`;

function Login(props) {
  const { signInEmailUser, signInWithProvider } = props;
  const [error, setError] = useState();

  const handleSubmit = async data => {
    const { email, password } = data;

    try {
      const user = await signInEmailUser(email, password);
      console.log(user);
    } catch (error) {
      debugger;
      setError(error.message);
    }
  };

  const handleSocialLogin = provider => {
    signInWithProvider(provider);
  };

  return (
    <StyledWrapper>
      <StyledTile>
        <StyledHeading>Login With </StyledHeading>
        <Form
          onSocialLogin={handleSocialLogin}
          serverError={error}
          onSubmit={handleSubmit}
          buttonText="LOGIN"
        />
        <StyledLink to="/join"> Not a member - Join </StyledLink>
      </StyledTile>
    </StyledWrapper>
  );
}

Login.propTypes = {
  signInEmailUser: PropTypes.func.isRequired,
  signInWithProvider: PropTypes.func.isRequired
};

export default Login;
