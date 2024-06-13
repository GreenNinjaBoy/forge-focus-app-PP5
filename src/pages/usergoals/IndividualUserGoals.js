import React, {useContext, useState} from 'react';
import { useAccordionToggle, AccordionContext } from 'react-bootstrap';
import Accordion from 'react-bootstrap';
import Card from 'react-bootstrap';
import UserGoalsView from './UserGoalsView';
import UserGoalEdit from './UserGoalEdit';
import AssignmentList from '../assignments/AssignmentList';
import UserGoalDelete from './UserGoalDelete';

const IndividualUserGoals = (props) => {

  const {
    refine_id,
    goal,
    usergoals,
    setUserGoals,
  } = props;

  const [userGoalState, setUserGoalState] = useState("view");

  function UserGoalContext() {
    if(userGoalState==='view') {
      return <UserGoalsView{...usergoals} goals={goals} setUserGoals={setUserGoals} setUserGoalState={setUserGoalState} />
    } else if (userGoalState==='edit') {
      return <UserGoalEdit{...usergoals} goals={goals} setUserGoals={setUserGoals} setUserGoalState={setUserGoalState} />
    } else if (userGoalState==='delete') {
      return <UserGoalDelete{...usergoals} goals={goals} setUserGoals={setUserGoals} setUserGoalState={setUserGoalState} />
    }
  };

  
  return (
    <div>IndividualUserGoals</div>
  )
}

export default IndividualUserGoals