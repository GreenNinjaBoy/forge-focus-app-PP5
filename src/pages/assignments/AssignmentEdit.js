import React, {useState} from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import { Alert, Form } from 'react-bootstrap';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';

const AssignmentEdit = (props) => {
  const {
    id,
    name,
    refine,
    usergoal,
    achieve_by,
    assignments,
    setAssignments,
    setAssignmentState,
    type
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const convertedDate = () => {
    if (achieve_by !== null){
      const dateWithTime = new Date(achieve_by).toISOString()
      return dateWithTime.split('T')[0];
    } else {
      return '';
    } 
  };

  const assignmentList = assignments.results;

  const [taskData, setAssignmentData] = useState({
    newName: name,
    newRefine: refine,
    newUserGoal: usergoal,
    newAchieve_by: convertedDate(),
  })

  const {
    newName,
    newRefine,
    newUserGoal,
    newAchieve_by,
  } = taskData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setAssignmentData({
      ...setAssignmentData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    setAssignmentState("view");
  };

  return (
    <div>AssignmentEdit</div>
  )
}

export default AssignmentEdit