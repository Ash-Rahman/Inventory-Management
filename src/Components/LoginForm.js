import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Components/Button";
import ErrorLabel from "../Components/ErrorLabel"
import styled from "styled-components";
import { SocialIcon } from "react-social-icons";
import { useForm } from 'react-hook-form';

import * as yup from 'yup';
const StyledHeading = styled.h2`
    text-align: center;
    margin-top: 2%;
    color: ${({ theme }) => theme.colors.purple};
  `;

  const StyledSocialIconArea = styled.div`
    display: flex;
    justify-content: space-around;
    a: {
      cursor: pointer;
    }
  `;



function LoginForm(props) {
  
  const {buttonText, onSubmit, serverError, onSocialLogin} = props;
  const [displayEmail, setDisplayEmail] = useState(false);

  const loginFormSchema = yup.object().shape({
    email: yup.string().email('please enter a valid email').required('please enter a email'),
    password: yup.string().required('please enter a password').min(5, 'password must be 5 characters long')
  })


  const { register, handleSubmit,  errors } = useForm({validationSchema:loginFormSchema});
  

  const handleClick = e => {
    e.preventDefault();
    setDisplayEmail(!displayEmail);

  }

  const handleInnerSubmit = data => { onSubmit(data) }
  const errorBorder = error => error && ({borderColor: 'red'})
  const handleSocialClick = provider => {
    onSocialLogin(provider)
  }

  return (
    <React.Fragment>
      <StyledSocialIconArea>
        <SocialIcon onClick={() => handleSocialClick("facebook")} network="facebook" />
        <SocialIcon onClick={() => handleSocialClick("google")} network="google" />
       { /*

       I am currently awaiting for my twitter developer AIP access to be approved
       
       <SocialIcon onClick={() => handleSocialClick("twitter")} network="twitter" />
       
       */}
      </StyledSocialIconArea>
      <StyledHeading> OR </StyledHeading>
  

       {!displayEmail &&  (<Button onClick={handleClick}   text="Email" />)   } 
       

       {displayEmail && (
         
          <form onSubmit={handleSubmit(handleInnerSubmit)}>
          <p>
            <label> Email   </label>
          </p>
          <p>
            <input type="text" name="email" style={errorBorder(errors.email)} ref={register}/>
            <ErrorLabel> {errors.email && errors.email.message} </ErrorLabel>
         
          </p>
          
            <label> Password </label>
      
          <p>
            <input type="password" name="password" ref={register} style={errorBorder(errors.password)} />
            <ErrorLabel> {errors.password && errors.password.message} </ErrorLabel>
          </p>
         
          <Button  text={buttonText} />  
          <ErrorLabel>{serverError}  </ErrorLabel>
         
        </form>
       )}
      
    </React.Fragment>
  );
}

LoginForm.propTypes = {
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onSocialLogin: PropTypes.func.isRequired,
  error: PropTypes.string
};

LoginForm.defaultProps = {
  buttonText: "JOIN",
  serverError: '',
  
};

export default LoginForm;
