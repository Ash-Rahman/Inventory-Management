import React from 'react';
import styled from "styled-components";
import ClipLoader from "react-spinners/FadeLoader";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  flex-direction: column;
  color: #FFFFFF;
  background-color: #252F36;
}`

const  Loader = () => {
    return (
        <StyledWrapper>
            <ClipLoader
                    size={50}
                    color={"#FFFFFF"}
                    loading={true}
            />
            <div>
            <p>loading ...</p>
            </div>


        </StyledWrapper>


    )
}


export default Loader;
