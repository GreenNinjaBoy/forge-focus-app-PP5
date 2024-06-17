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
    <Card key={usergoals.id}>
      <Card.Header>
        <ContextAwareToggle as={Card.Header} eventkey={goal.id}>
          <h3>{usergoal.title}</h3>
        </ContextAwareToggle>
      </Card.Header>
      <Accordion.Collapse eventKey={usergaol.id}>
        <Card.Body>
          <UserGoalContext />
          <div>
            <h3>Assignments for your goal</h3>
            <AssignmentList usergoal_id={usergoal.id} refine_id={refine_id} type="goal" />
          </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export default IndividualUserGoals