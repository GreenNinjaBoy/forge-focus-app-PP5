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

  const userGoalList = userGoals.results;

  const [userGoalData, setUserGoalData] = useState ({
    newTitle: title,
    newDescription: description,
    newValue, value,
    newCriteria: criteria,
    newAchieve_By: convertedDate(),
  });

  const [errors, setErrors] = useState({});

  const {
    newTitle,
    newDescription,
    newValue,
    newCriteria,
    newAchieve_By,
  } = userGoalData;

  const handleChange = (event) => {
    setUserGoalData({
      ...userGoalData,
      [event.target.name]: event.target.value,
    });
    };

    
  }
}

export default UserGoalEdit