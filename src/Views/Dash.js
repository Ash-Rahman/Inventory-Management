import React, {useEffect, useState, Component} from "react";
import PropTypes from "prop-types";
import DaysCompleted from "../Components/DaysCompleted";
import Item from "../Components/Item";
import avatarPlaceHolder from "../assets/avatar_placeholder.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as dayjs from 'dayjs';
import SearchBar from '../Components/SearchBar';

function Dash(props) {

  const {user, readCheckins, readChallenges, createItemHistory, readItemHistory, updateCurrentItem} = props;
  const [allCheckins, setAllCheckins] = useState([]);
  const [inputItemType, setInputItemType] = useState('');
  const [inputItemName, setInputItemName] = useState('');
  const [inputItemOwner, setInputItemOwner] = useState('');
  const [filteredCheckins, setFilteredCheckins] = useState([]);
  const [daysComplete, setDaysComplete] = useState(0);
  const [percentageComplete, setPercentageComplete] = useState(0);

   const handleComment = async (checkinId, comment) => {

    await createItemHistory(checkinId, comment);

   }

  //  const handleItemUpdate = async (checkinId, data) => {

  //   await updateCheckin(checkinId, data);

  //  }

  useEffect(() => {

    const getAllCheckins =  async () => {
      const aCheckins =  await readCheckins();
      let checkins = [];
      aCheckins.forEach(c => checkins.push({...c.data(),...{id:c.id} }));
      setAllCheckins(checkins);

      // if (inputItemType == "" && inputItemName == "" && inputUserEmail == "") {
      if (inputItemType == "") {
        console.log("empty Array");
        setFilteredCheckins(checkins);
      }

      console.log("FilterecCheckin Init: ", filteredCheckins);
    }

    // const getAllChallenges = async () => {
    //   const aChallenges = await readChallenges();
    //   let challenges = [];
    //   aChallenges.forEach(c => challenges.push(c.data()));
    //   // using the daysjs libary to work out the days to the end of the challenge
    //   const now =  dayjs();
    //   const start = dayjs(challenges[0].start.toDate());
    //   const end = dayjs(challenges[0].end.toDate());
    //   const totalDays = end.diff(start, 'day');
    //   const daysCompleted = now.diff(start, 'day');
    //   const percentageComplete = (parseInt(daysCompleted) / parseInt(totalDays)) * 100;

    //   setDaysComplete(daysCompleted);
    //   setPercentageComplete(Math.round(percentageComplete));

    //   }

    getAllCheckins();
    //getAllChallenges();



  }, [])


  const StyledButton = styled.button`
  height: 44.63px;
  background: linear-gradient(180deg, #bc9cff 0%, #8ba4f9 100%);
  border-radius: 22px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: right;
  cursor: pointer;
  width: 100%;
  margin-top: 6%;
  border: none;
`;

  const StyledHeading = styled.h2`
  text-align: center;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  padding-bottom: 20px;
  color: ${ props => props.theme.colors.white};
  `;

  const StyledDetailsArea = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-column-gap: 5%;
    grid-row-gap: 40px;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    textarea {
        border-radius: 4px;
        border: 1px solid ${({ theme }) => theme.colors.darkShade[25]};
    }`;


  const StyledDivPage = styled.div`
    background-color: ${({ theme }) => theme.colors.darkBlue};
  }`;

  const BarStyling = styled.textarea`
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

    const handleKeyPress = (e) => {
      //This takes all of the search bar inputs and does a search filter based on all of them.
      //I am sorry this is absolutely disgustingly written!
      if(e.key === 'Enter') {
        let afilteredCheckins = allCheckins;
        if(inputItemType != "" && inputItemName != "" && inputItemOwner != "") {
          afilteredCheckins = afilteredCheckins.filter(c =>
            c.type.toLowerCase().includes(inputItemType.trim().toLowerCase()) &&
            c.name.toLowerCase().includes(inputItemName.trim().toLowerCase()) &&
            c.owner.toLowerCase().includes(inputItemOwner.trim().toLowerCase())
          );
        } else if (inputItemType != "" && inputItemName != "") {
          afilteredCheckins = afilteredCheckins.filter(c =>
            c.type.toLowerCase().includes(inputItemType.trim().toLowerCase()) &&
            c.name.toLowerCase().includes(inputItemName.trim().toLowerCase())
          );
        } else if (inputItemType != "" && inputItemOwner != "") {
          afilteredCheckins = afilteredCheckins.filter(c =>
            c.type.toLowerCase().includes(inputItemType.trim().toLowerCase()) &&
            c.owner.toLowerCase().includes(inputItemOwner.trim().toLowerCase())
          );
        } else if (inputItemName != "" && inputItemOwner != "") {
          afilteredCheckins = afilteredCheckins.filter(c =>
            c.name.toLowerCase().includes(inputItemName.trim().toLowerCase()) &&
            c.owner.toLowerCase().includes(inputItemOwner.trim().toLowerCase())
          );
        } else if (inputItemType != "") {
          afilteredCheckins = afilteredCheckins.filter(c =>
            c.type.toLowerCase().includes(inputItemType.trim().toLowerCase())
          );
        } else if (inputItemName != "") {
          afilteredCheckins = afilteredCheckins.filter(c =>
            c.name.toLowerCase().includes(inputItemName.trim().toLowerCase())
          );
        } else if (inputItemOwner != "") {
          afilteredCheckins = afilteredCheckins.filter(c =>
            c.owner.toLowerCase().includes(inputItemOwner.trim().toLowerCase())
          );
        }

        setFilteredCheckins(afilteredCheckins);
        console.log("allCheckins", JSON.stringify(allCheckins));
        console.log("aFiltered ", JSON.stringify(afilteredCheckins));
        console.log("filteredArr: ", JSON.stringify(filteredCheckins));
      }

   }
  //  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  //console.log(JSON.stringify(allCheckins));
  return (
    <div>
        {/* <textarea rows="4"
                  onChange={e => setInputItemType(e.target.value)}
                  onKeyPress={handleKeyPress}
                  value={inputItemType}
        >
        </textarea> */}
        <SearchBar setItemType={setInputItemType} onKeyPress={handleKeyPress} setItemName={setInputItemName} setItemOwner={setInputItemOwner}
          itemType={inputItemType} itemName={inputItemName} itemOwner={inputItemOwner}
        >
        </SearchBar>
         {/* <BarStyling  rows="4"
                onChange={e => setInputItemType(e.target.value)}
                onKeyPress={handleKeyPress}
                value={inputItemType}
                placeholder={"search item type"}
        >
        </BarStyling>
         <BarStyling  rows="4"

                onChange={e => setInputItemName(e.target.value)}
                onKeyPress={handleKeyPress}
                value={inputItemName}
                placeholder={"search item name"}
        >
        </BarStyling>
        <BarStyling  rows="4"

                onChange={e => setInputUserEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                value={inputUserEmail}
                placeholder={"search user type"}
        >
        </BarStyling> */}
      <StyledHeading> Your Checked-Out Items! </StyledHeading>
      {
          filteredCheckins.length > 0 ?
            <StyledDetailsArea>
            {
              filteredCheckins.filter(c => c.owner === user.email).map( (c) =>

                  <Item onComment={handleComment} user={user} checkin={c}
                        readItemHistory={readItemHistory} createItemHistory={createItemHistory}
                        updateCurrentItem={updateCurrentItem}
                  />

              )
            }
            </StyledDetailsArea>

          : <StyledHeading> No results </StyledHeading>

      }

      <StyledHeading> All Items </StyledHeading>
      {
        filteredCheckins.length > 0 ?
           <StyledDetailsArea>
           {
              filteredCheckins.filter(c => c.owner != user.email).map( (c) =>

                <Item onComment={handleComment} user={user} checkin={c}
                readItemHistory={readItemHistory} createItemHistory={createItemHistory}
                updateCurrentItem={updateCurrentItem} />

              )
           }
           </StyledDetailsArea>

        : <StyledHeading> No results </StyledHeading>
      }

    </div>
  );
}

Dash.propTypes = {
    checkins: PropTypes.array.isRequired,
    readCheckins: PropTypes.object.isRequired
};

export default Dash;


