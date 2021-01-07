import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Button(props) {

  const {onClick, text, ...args} = props;
    
  const StyledButton = styled.button`
    height: 44.63px;
    background: linear-gradient(180deg, #bc9cff 0%, #8ba4f9 100%);
    border-radius: 22px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
    margin-top: 6%;
    border: none;
  `;

  return(  
    <StyledButton onClick={onClick} {...args}> {text} </StyledButton>
  )
}

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired
}

Button.defaultProps = {
    onClick: () => {}
}

export default Button;