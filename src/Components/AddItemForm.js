import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Tile from "./Tile";
import styled from "styled-components";

import drinkIcon from "../assets/drink-icon.svg";
import foodIcon from "../assets/food-icon.svg";
import Button from "./Button";
import ErrorLabel from "./ErrorLabel";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const StyledTile = styled(Tile)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  grid-row-gap: 20px;
  width: 100%;
`;

const StyledHeading = styled.h4`
  text-align: center;
  margin-top: 2%;
  color: ${({ theme }) => theme.colors.purple};
`;

const StyledLabel = styled.label`
  text-align: left;
  margin-top: 5%;
  color: #ffffff;
`;

const StyledForm = styled.form`
  display: grid;
  justify-content: center;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.darkBlue};
`;
const StyledCheckinP = styled.p`
  display: flex;
  font-size: 13px;
  justify-content: space-around;
  margin-top: 5%;
  input:nth-child(1) {
    background: green;
  }

  input:checked {
    background-color: #a77e2d !important;
    color: #ffffff !important;
  }
`;

const StyledFoodDrinkArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
`;

const StyledSelect = styled.select`
  padding-left: 25%;
  //text-indent: 40%;
  background: white;
  width: 135px;
  height: 44px;
  font-size: 14px;
  color: rgba(31, 32, 65, 0.75);
`;

const StyledIcon = styled.img`
  margin-right: -10px;
  z-index: 2000;
  display: relative;
  position: absolute;
  margin-top: 10px;
  margin-left: 6px;
`;

const StyledCheckinTitle = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 12px;
    color:  ${({ theme, error}) => error ? "red" : theme.colors.darkShade[25]};
    margin-top: 5%;
  }
`;

const StyledButtonGreen = styled.button`
  height: 44.63px;
  background: ${({ theme }) => theme.colors.buttonGreen};
  border-radius: 22px;
  color: white;
  justify-content: center;
  align-items: right;
  cursor: pointer;
  width: 100%;
  margin-top: 6%;
  border: none;
`;

const AddItemForm = props => {

  const {onSubmit} = props;
  //const [total, setTotal] = useState(0);

  const maxCommentLength = 5;

  const checkinFormSchema = yup.object().shape({
    type: yup.string().required("you must give this an item type"),
    name: yup.string().required("you must name this item"),
    uniqueIdentifier: yup.string(),
    description: yup.string().required("you must give this item a description"),
    location: yup.string().required("you must tell us the current location of the item"),
    action: yup.string().required("you must give this an item type"),
    owner: yup.string(),
  });

  const { register, handleSubmit, errors, watch } = useForm({
    validationSchema: checkinFormSchema,
    defaultValues: {type: "", name: "", uniqueIdentifier: "",  description: "", location: "", action: "createdItem", owner: ""}
  });

  const onFormSubmit = data => {
    //onSubmit({...data, ...checkinScore, ...{total:total}});
    onSubmit({...data });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      <StyledLabel>Item Type*</StyledLabel>
        <StyledFoodDrinkArea>
          <div>
            <StyledSelect name="type" ref={register}>
              <option value="Card"> Card </option>
              <option value="Cable"> Cables </option>
              <option value="Cd"> Cd's </option>
              <option value="USB"> USB </option>
              <option value="Server"> Server </option>
            </StyledSelect>
          </div>
        </StyledFoodDrinkArea>
      <ErrorLabel> {errors.type && errors.type.message} </ErrorLabel>

      <StyledLabel>Item Name*</StyledLabel>
      <StyledCheckinP>
        <textarea rows="4" cols="40" name="name" ref={register}></textarea>
      </StyledCheckinP>
      <ErrorLabel> {errors.name && errors.name.message} </ErrorLabel>

      <StyledLabel>Item Unique Identifier (e.g Serial Number)</StyledLabel>
      <StyledCheckinP>
        <textarea rows="4" cols="40" name="uniqueIdentifier" ref={register}></textarea>
      </StyledCheckinP>
      <ErrorLabel> {errors.uniqueIdentifier && errors.uniqueIdentifier.message} </ErrorLabel>

      <StyledLabel>Item Description*</StyledLabel>
      <StyledCheckinP>
        <textarea rows="4" cols="40" name="description" ref={register}></textarea>
      </StyledCheckinP>
      <ErrorLabel> {errors.description && errors.description.message} </ErrorLabel>

      <StyledLabel>Item Location*</StyledLabel>
      <StyledCheckinP>
        <textarea rows="4" cols="40" name="location" ref={register}></textarea>
      </StyledCheckinP>
      <ErrorLabel> {errors.location && errors.location.message} </ErrorLabel>

      <StyledLabel>Item action*</StyledLabel>
      <StyledCheckinP>
        <textarea rows="4" cols="40" name="action" value="createdItem" ref={register}></textarea>
      </StyledCheckinP>
      <ErrorLabel> {errors.location && errors.location.message} </ErrorLabel>

      <StyledLabel>Item Owner*</StyledLabel>
      <StyledCheckinP>
        <textarea rows="4" cols="40" name="owner" value="None" ref={register}></textarea>
      </StyledCheckinP>
      <ErrorLabel> {errors.location && errors.location.message} </ErrorLabel>

      {/* <StyledCheckinTitle  error={remainingCommentCount < 0} >
      <StyledLabel>Comment</StyledLabel> <p>{remainingCommentCount}</p>{" "}
      </StyledCheckinTitle>
      <textarea rows="4" cols="40" name="comment" ref={register}></textarea> */}
      {/* <StyledHeading> Total: {total} points </StyledHeading> */}
      <StyledButtonGreen text="CHECKIN" type="submit"> Add Item </StyledButtonGreen>
    </StyledForm>
  );
};

AddItemForm.propTypes = {

  onSubmit: PropTypes.func.isRequired

};

export default AddItemForm;
