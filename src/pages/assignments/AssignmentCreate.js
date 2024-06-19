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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name)
    if (refine) {
      formData.append('refine', refine)
    };
    if (usergoal) {
      formData.append('usergoal', usergoal)
    }
    if (achieve_by) {
      const parts = achieve_by.split('-');
      const date = new Date(psrts[0], parts[1] -1, parts[2], 12);
      const djangoDate = date.toISOString();
      formData.append('achieve_by', djangoDate);
    }
    try {
      const {data} = await axiosReq.post(`/assignments/`, formData);
      setGlobalSuccessMessage("New assignment created");
      setShowGlobalSuccess(true);
      setAssignments(
        { results: [
          ...assignmentList,
          data
        ]}
      );
      setAssignmentData({
        name: '',
        refine: refine_id,
        usergoal: usergoal_id,
        achieve_by: '',
      });
    } catch(err){
      console.log(err);
      if (err.response?.status !==401) {
        setErrors(err.response?.data);
      }
    }
  };
  
  return (
    <div>AssignmentCreate</div>
  )
}

export default AssignmentCreate