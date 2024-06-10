import React, { useState } from 'react';
import { Alert, Button, From } from 'bootstrap';
import {axiosReq} from '../../api/axiosDefaults';
import {useSetGlobalSuccessMessage, useSetShowGlobalSuccess, useSetShowGlobalSuccess} from '../../context/GlobalMessageContext';
import axios from 'axios';
import { set } from 'msw/lib/types/context';

const UserGoalCreate = (props) => {
  const {
    usergoals,
    setUserGoals,
    setUserGoalsState,
    setKeyParameters,
    KeyParameters
  } = props

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();
  
  const { refine_id } = KeyParameters;

  const goallist = usergoals.results;

  const [userGoalData, setUserGoalData] = useState ({
    title:'',
    description:'',
    value:'',
    criteria:'',
    achieve_by:'',
  });

  const {
    title,
    description,
    value,
    criteria,
    achieve_by,
  } = userGoalData;

  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title)
    formData.append('description', description)
    formData.append('criteria', criteria)
    formData.append('refine', refine_id)
    if (achieve_by) {
      const parts = achieve_by.split('-');
      const date = new Date(part[0], parts[1] -1, parts[2], 12);
      const djangoDate = date.toISOString();
      formData.append('achieve_by', djangoDate)
    }
    try {
      const {data} = await axios.request.post('/usergoals/', formData);
      setGlobalSuccessMessage("Congratulations you have created a new Goal");
      setShowGlobalSuccess(true);
      setKeyParameters({
        ...KeyParameters,
        usergoal_id: data.id,
      });
      setUserGoals(
        { results: [
          ...goallist,
          data
        ]}
      );
      if (setUserGoalsState) {
        setUserGoalsState("view");
      } else {
        setUserGoalsState({
          title: '',
          description: '',
          value: '',
          criteria: '',
          achieve_by: '',
        })
      };
    } catch(err) {
      if (err.response?.status !== 401){
        setErrors(err.response?.data);
      }
    }
  };

  const handleChange = (event) => {
    setUserGoalData({
      ...userGoalData,
      [event.target.name]: event.target.value,
    });
  };

  


  return (
    <div>UserGoalCreate</div>
  )
}

export default UserGoalCreate