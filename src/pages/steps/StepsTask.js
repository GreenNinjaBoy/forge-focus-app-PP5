import React from 'react';
import {axiosReq} from '../../api/axiosDefaults';
import {link} from 'react-router-dom/cjs/react-router-dom';
import {useSetGlobalSuccessMessage, useSetGlobalSuccessMessage, useSetShowGlobalSuccess} from '../../context/GlobalMessageContext';

const StepsTask = (props) => {
  const {
    id,
    name,
    image,
    context,
    today,
    achieved,
    refine,
    achieve_by_info,
    usergoal_achieve_by_info,
    type,
    activeAssignments,
    setActiveAssignments,
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  const handleTodayToggle = async (event) => {
    const checkbox = event.target;
    if (checkbox.checked) {
      try {
        const {data} = await axiosReq.patch(`/assignments/${id}`, {today: true});
        setGlobalSuccessMessage("Assignment moved into today");
        setShowGlobalSuccess(true);
        const activeList = activeAssignments.results;
        const assignmentIndex = activeList.findIndex( assignment => assignment.id === id);
        activeList[assignmentIndex] = data;
        setActiveAssignments(
          {
            results: [
              ...activeList
            ]
          }
        );
      } catch(err) {
        console.log(err)
      }
    } else {
      try {
        const {data} = await axiosReq.patch(`/assignments/${id}`, {today: false});
        setGlobalSuccessMessage("Assignment removed from today");
        setShowGlobalSuccess(true);
        const activeList = activeAssignments.results;
        const assignmentIndex = activeList.findIndex( assignment => assignment.id === id);
        activeList[assignmentIndex] = data;
        setActiveAssignments(
          {
            results: [
              ...activeList
            ]
          }
        );
      } catch(err) {
        console.log(err)
      }
    }
  }
  
    }
  return (
    <div>StepsTask</div>
  )
}

export default StepsTask