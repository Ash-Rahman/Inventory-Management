import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';



const ErrorLabel = props => {


    const StyledErrorLabel = styled.label`
    
        color:red;
        font-weight: bolder;
        margin: 1% 0 4% 0;

    `

    const {children} =  props;

    return (
        <StyledErrorLabel> 
            {children}
        </StyledErrorLabel>
    )
}



export default ErrorLabel
