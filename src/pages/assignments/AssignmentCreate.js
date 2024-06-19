import React, {useState} from 'react';
import { Alert, Form } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { useSetGlobalSuccessMessage, useShowGlobalSuccess } from '../../context/GlobalMessageContext';

const AssignmentCreate = ( props) => {
  const {
    refine_id,
    usergoal_id,
    assignments,
    setAssingments,
    type
  } = props;

  const setShowGlobalSuccess = useSetGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  const assignmentList = assignments.results;

  const [assignmentData, setAssignmentData] = useState ({
    name:'',
    refine: refine_id,
    usergoal: usergoal_id,
    achieve_by: '',
  });

  const {
    name,
    refine,
    usergoal,
    achieve_by,
  } = assignmentData;

  const [errors, setErrors] = useState({});

  
  return (
    <div>AssignmentCreate</div>
  )
}

export default AssignmentCreate