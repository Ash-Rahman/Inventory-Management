import React, {useState} from "react";
import PropTypes from 'prop-types';
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



function Join(props) {

  const {createEmailUser, signInWithProvider} = props;
  const [error, setError] = useState();
  

  const handleSubmit = async (data) => {
    
    const {email, password} = data;
    
    try {
      await createEmailUser(email, password);
    } catch (error) {
      setError(error.message);
    }
    
  }

  const handleSocialLogin = provider => {
    signInWithProvider(provider);
  }

  return (
    <StyledWrapper>
      <StyledTile>
        <StyledHeading>Get Started</StyledHeading>
        <StyledHeading>Join With </StyledHeading>
        <Form onSocialLogin={handleSocialLogin} onSubmit={handleSubmit} serverError={error} />
        <StyledLink to="/login"> Already a member - Login </StyledLink>
      </StyledTile>
    </StyledWrapper>
  );
}

Join.propTypes = {
  createEmailUser: PropTypes.func.isRequired,
  signInWithProvider: PropTypes.func.isRequired

};

export default Join;
