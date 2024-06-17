import React, {useEffect, useState} from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { Button, Spinner  } from 'react-bootstrap'
import UserGoalsView from './UserGoalsView'
import UserGoalCreate from './UserGoalCreate'
import UserGoalEdit from './UserGoalEdit'
import UserGoalDelete from './UserGoalDelete'
import AssignmentList from '../assignments/AssignmentList'

const UserGoalSection = (props) => {
  const {
    keyParameters,
    setKeyParameters,
  } = props;

  const {
    refine_id,
    userGoal_id,
  } = keyParameters

  const [usergoals, setUserGoals] = useState({ results: []});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentUserGoal, setCurrentUserGoal] = useState();
  const [userGoalState, setUserGoalState] = useState("view");

  const handleCreate = () => {
    setUserGoalState("create");
    setKeyParameters({
      ...keyParameters,
      refine_id: '',
    });
  }

  useEffect(() => {
    const fecthUserGoals = async () => {
      try {
        const {data} = await axiosReq.get(`goals/?refine_id=${refine_id}`);
        setUserGoals(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err)
      }
    };
    setHasLoaded(false);
    fecthUserGoals();
  }, [refine_id]);

  useEffect (() => {
    const getCurrentUserGoal = () => {
      const userGoal - usergoals.results.filter((userGoal) => userGoal.id === userGoal_id)[0];
      setCurrentUserGoal(userGoal)
    };
    if (hasLoaded && goal_id) {
      getCurrentUserGoal();
    } else {
      setCurrentUserGoal();
    }
  }, [userGaol_id, hasLoaded, userGoals]);

  

  return (
    <div>UserGoalSection</div>
  )
}

export default UserGoalSection