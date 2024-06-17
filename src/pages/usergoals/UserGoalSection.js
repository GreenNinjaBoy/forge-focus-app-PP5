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
      const userGoal = usergoals.results.filter((userGoal) => userGoal.id === userGoal_id)[0];
      setCurrentUserGoal(userGoal)
    };
    if (hasLoaded && goal_id) {
      getCurrentUserGoal();
    } else {
      setCurrentUserGoal();
    }
  }, [userGoal_id, hasLoaded, userGoals]);

  function ContextAwareToggle({ children, eventKey, callBack}) {
    const openUserGoal = () => {
      if (eventKey===userGoal_id) {
        setKeyParameters({
          ...keyParameters,
          userGoal_id: '',
        });
      } else {
        setKeyParameters({
          ...keyParameters,
          userGoal_id: eventKey,
        });
        setUserGoalState("view");
      }
    };

    return (
      <div
        style={{
          color: eventKey===userGoal_id ? '#3c159c' : 'black',
          fontWeight: eventKey===userGoal_id ? 'bold' : 'normal'}}
          onClick={openUserGoal}
          ariel-label={eventKey===userGoal_id ? 'Click to open your goal' : 'Click to close your goal'}
          >
            {children}
            <div>
              {eventKey=== userGoal_id ? (
                <i className='fa-solid fa-angle-right'></i>
              ): (
                <i className='fa-solid fa-angle-left'></i>
              )}
            </div>
      </div>
    );
  }

  function UserGoalContext () {
    if (userGoalState==='view') {
      return currentUserGoal ? (
        <>
        <UserGoalsView {...currentUserGoal} userGoals={userGoals} setCurrentUserGoal={setCurrentUserGoal} setUserGoalState={setUserGoalState} />
        <div>
          <h3>Assignments for your goal</h3>
          <AssignmentList refine_id={refine_id} userGoal_id={userGoal_id} type='goal'/>
        </div>
        </>
      )
    }
  }

  return (
    
  )
}

export default UserGoalSection