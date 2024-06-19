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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', newName)
    if (refine) {
      formData.append('refine', newRefine)
    };
    if (usergoal) {
      formData.append('usergoal', newUserGoal)
    }
    if (newAchieve_by) {
      const parts = newAchieve_by.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2], 12);
      const djangoDate = date.toISOString();
      formData.append('achieve_by', djangoDate);
    }
    try {
      const {data} = await axiosReq.put(`/assignments/${id}`, formData);
      setGlobalSuccessMessage("Assignment Edit Successful");
      setShowGlobalSuccess(true);
      const assignmentIndex = assignmentList.findIndex(assignment => assignment.id === id);
      assignmentList[assignmentIndex] = data;
      setAssignments(
        { results: [
          ...assignmentList
        ]}
      );
      setAssignmentState("view");
    } catch(err){
      console.log(err);
      if (err.response?.status !== 401){
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <div>AssignmentEdit</div>
  )
}

export default AssignmentEdit