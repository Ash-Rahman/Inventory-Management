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
`;

const StyledForm = styled.form`
  display: grid;
  justify-content: center;
  text-align: left;
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

const CheckinForm = props => {

  const {onSubmit} = props;
  //const [total, setTotal] = useState(0);

  const maxCommentLength = 5;

  const checkinFormSchema = yup.object().shape({
    uniqueIdentifier: yup.string(),
    name: yup.string().required("you must name this item"),
    type: yup.string().required("you must give this an item type"),
    description: yup.string().required("you must give this item a description"),
    location: yup.string().required("you must tell us the current location of the item")
  });

  const { register, handleSubmit, errors, watch } = useForm({
    validationSchema: checkinFormSchema,
    defaultValues: {comment: "", type: "", uniqueIdentifier: "", name: "", description: "", location: ""}
  });

  const comment = watch('comment');

  const [remainingCommentCount, setRemainingCommentCount] = useState(maxCommentLength);


  useEffect(() => {

      setRemainingCommentCount(maxCommentLength - comment.length);

  }, [comment])

  //  const formValues = watch();
  //  let checkinScore = {
  //     exercise: 0,
  //     veg: 0,
  //     water: 0,
  //     diet: 0
  //  }

  //  useEffect(() => {

  //   checkinScore.exercise = !formValues.exercise ? 0 : parseInt(formValues.exercise);
  //   checkinScore.veg = !formValues.veg ? 0 : parseInt(formValues.veg);
  //   checkinScore.water = !formValues.water ? 0 : parseInt(formValues.water);

  //   if (formValues.diet !== "") {

  //     checkinScore.diet = formValues.diet === "0" ? 10 - (parseInt(formValues.foodPen) + parseInt(formValues.drinkPen)) : parseInt(formValues.diet);

  //   }

  //   setTotal(checkinScore.exercise + checkinScore.veg + checkinScore.water + checkinScore.diet);


  //  }, [formValues])



  const diet = watch("diet");

  const onFormSubmit = data => {
    //onSubmit({...data, ...checkinScore, ...{total:total}});
    onSubmit({...data });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      {/*JSON.stringify("this is the" + diet)*/}
      <StyledLabel>Item Type*</StyledLabel>

        {/* <textarea rows="4" cols="40" name="type" ref={register}></textarea> */}
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

      {/* {diet === "0" && (
        <StyledFoodDrinkArea>
          <StyledLabel>Drinks</StyledLabel>
          <StyledLabel>Food</StyledLabel>
          <div>
            <StyledIcon src={drinkIcon}  />
            <StyledSelect name="drinkPen" ref={register}>
              <option value="0"> 0 </option>
              <option value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
            </StyledSelect>
          </div>
          <div>
            <StyledIcon src={foodIcon} />
            <StyledSelect name="foodPen" ref={register}>
              <option value="0"> 0 </option>
              <option value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
            </StyledSelect>
          </div>
        </StyledFoodDrinkArea>
      )} */}

      <StyledCheckinTitle  error={remainingCommentCount < 0} >
      <StyledLabel>Comment</StyledLabel> <p>{remainingCommentCount}</p>{" "}
      </StyledCheckinTitle>
      <textarea rows="4" cols="40" name="comment" ref={register}></textarea>
      {/* <StyledHeading> Total: {total} points </StyledHeading> */}
      <Button text="CHECKIN" type="submit"> </Button>
    </StyledForm>
  );
};

CheckinForm.propTypes = {

  onSubmit: PropTypes.func.isRequired

};

export default CheckinForm;
