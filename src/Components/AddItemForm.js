import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

import ErrorLabel from "./ErrorLabel";
import { useForm } from "react-hook-form";
import * as yup from "yup";

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

      <StyledButtonGreen text="CHECKIN" type="submit"> Add Item </StyledButtonGreen>
    </StyledForm>
  );
};

AddItemForm.propTypes = {

  onSubmit: PropTypes.func.isRequired

};

export default AddItemForm;
