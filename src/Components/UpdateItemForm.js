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
import { useHistory, useLocation } from "react-router-dom";
import Item from "./Item";

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

const UpdateItemForm = props => {

  const {onSubmit, item} = props;
  // console.log("I got item form ", item);
  // const location = useLocation();

  // const [item, setItemValue] = useState();

  // if (location.query) {
  //   console.log("query1: ", JSON.stringify(location.query));
  //   const getItem = async () => {
  //     const aItem = await getCheckinById(location.query.id);
  //     console.log("query2: ", location.query);
  //     item = aItem.data();
  //     console.log("item: ", item);
  //     setItemValue(item)
  //   }
  //   getItem()
  // }

  // console.log("Form Item", item);
  // const { data } = this.props.location;
  // print(data);

  const maxCommentLength = 5;

  const checkinFormSchema = yup.object().shape({
    type: yup.string().required("you must give this an item type"),
    name: yup.string().required("you must name this item"),
    uniqueIdentifier: yup.string(),
    description: yup.string().required("you must give this item a description"),
    location: yup.string().required("you must tell us the current location of the item"),
    action: yup.string().required("you must give this an item action"),
    owner: yup.string()
  });

  let owner;

  if (item.owner == "") {
    owner = "None"
  } else {
    owner = item.owner
  }

  const { register, handleSubmit, errors, watch } = useForm({
    validationSchema: checkinFormSchema,
    defaultValues: {type: item.type, name: item.name, uniqueIdentifier: item.uniqueIdentifier,  description: item.description, location: item.location, action: "updatedItemInfo", owner: owner}
  });

  // const comment = watch('comment');

  const [remainingCommentCount, setRemainingCommentCount] = useState(maxCommentLength);


  // useEffect(() => {

  //     setRemainingCommentCount(maxCommentLength - comment.length);

  // }, [comment])

  const diet = watch("diet");

  const onFormSubmit = data => {
    //onSubmit({...data, ...checkinScore, ...{total:total}});
    onSubmit({...data });
  };

  return (

    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      {/*JSON.stringify("this is the" + diet)*/}

      <StyledLabel>Item Type*</StyledLabel>
      <StyledCheckinP>
        <textarea rows="4" cols="40" name="type" value={item.type} ref={register}> </textarea>
      </StyledCheckinP>
      <ErrorLabel> {errors.type && errors.name.type} </ErrorLabel>

      <StyledLabel>Item Name*</StyledLabel>
      <StyledCheckinP>
        <textarea rows="4" cols="40" name="name"  ref={register}> </textarea>
      </StyledCheckinP>
      <ErrorLabel> {errors.name && errors.name.message} </ErrorLabel>

      <StyledLabel>Item Unique Identifier (e.g Serial Number)</StyledLabel>
      <StyledCheckinP>
        <textarea rows="4" cols="40" name="uniqueIdentifier" ref={register}> </textarea>
      </StyledCheckinP>
      <ErrorLabel> {errors.uniqueIdentifier && errors.uniqueIdentifier.message} </ErrorLabel>

      <StyledLabel>Item Description*</StyledLabel>
      <StyledCheckinP>
        <textarea rows="4" cols="40" name="description" ref={register}>  </textarea>
      </StyledCheckinP>
      <ErrorLabel> {errors.description && errors.description.message} </ErrorLabel>

      <StyledLabel>Item Location*</StyledLabel>
      <StyledCheckinP>
        <textarea rows="4" cols="40" name="location" ref={register}>  </textarea>
      </StyledCheckinP>
      <ErrorLabel> {errors.location && errors.location.message} </ErrorLabel>

      <StyledLabel>Item action*</StyledLabel>
      <StyledCheckinP>
        <textarea rows="4" cols="40" name="action" value="updatedItemInfo" ref={register}></textarea>
      </StyledCheckinP>
      <ErrorLabel> {errors.location && errors.location.message} </ErrorLabel>

      <StyledLabel>Item Owner*</StyledLabel>
      <StyledCheckinP>
        <textarea rows="4" cols="40" name="owner" value={owner} ref={register}></textarea>
      </StyledCheckinP>
      <ErrorLabel> {errors.owner && errors.owner.message} </ErrorLabel>

      <Button text="CHECKIN" type="submit"> </Button>
    </StyledForm>
  );
};

UpdateItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

export default UpdateItemForm;
