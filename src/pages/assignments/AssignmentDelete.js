import React from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';

const AssignmentDelete = (props) => {
  const {
    const {
      id,
      name,
      assignments,
      setAssignments,
      setAssignmentState
    } = props;
  
    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  
  
    const assignmentList = assignments.results;
  
    const handleCancel = () => {
      setAssignmentState('view');
    };
  }


  return (
    <div>AssignmentDelete</div>
  )
}

export default AssignmentDelete