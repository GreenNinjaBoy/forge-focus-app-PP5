import React, {useState} from 'react';
import { Alert, Button, Form } from 'bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { useGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';

const UserGoalEdit = (props) => {
  const{
    id,
    refine,
    title,
    description,
    value,
    criteria,
    achieve_by,
    usergoals,
    setUserGoals,
    setUserGoalState
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useGlobalSuccessMessage();

  const convertedDate = () => {
    if (achieve_by !== null){
      return new Date(achieve_by).toISOString().split('T')[0];
    } else {
      return '';
    }
  };

  
}

export default UserGoalEdit