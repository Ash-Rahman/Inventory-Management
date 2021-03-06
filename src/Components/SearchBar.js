import React, {useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

//     <input
//     style={BarStyling}
//     key="random1"
//     value={keyword}
//     placeholder={"search country"}
//     onChange={(e) => setKeyword(e.target.value)}
//    />

const BarStyling = styled.input`
    width: 25%;
    background: ${({ theme }) => theme.colors.white};
    align-items: center;
    padding: 0.5rem;
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    textarea {
        border-radius: 4px;
        border: 1px solid ${({ theme }) => theme.colors.darkShade[25]};
}`;
const StyledDivPage = styled.div`
    background-color: ${({ theme }) => theme.colors.darkBlue};
}`;

const SearchBar = (props) => {
  const {setItemType, onKeyPress, setItemName, setItemOwner, itemType, itemName, itemOwner} = props;

  return (
    <StyledDivPage>
        <BarStyling  rows="4"
            onChange={e => setItemType(e.target.value)}
            onKeyPress={onKeyPress}
            value={itemType}
            placeholder={"search item type"}
        >
        </BarStyling>

        <BarStyling  rows="4"
            onChange={e => setItemName(e.target.value)}
            onKeyPress={onKeyPress}
            value={itemName}
            placeholder={"search item name"}
        >
        </BarStyling>

        <BarStyling  rows="4"
            onChange={e => setItemOwner(e.target.value)}
            onKeyPress={onKeyPress}
            value={itemOwner}
            placeholder={"search item owner (email)"}
        >
        </BarStyling>
    </StyledDivPage>
  );
}

export default SearchBar