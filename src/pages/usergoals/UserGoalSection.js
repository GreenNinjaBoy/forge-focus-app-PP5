import React, {useEffect, useState} from 'react';
// import currentUser from '../../context/CurrentUserContext';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/UserGoal.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { Button, Spinner  } from 'react-bootstrap';
import UserGoalsView from './UserGoalsView';
import UserGoalCreate from './UserGoalCreate';
import UserGoalEdit from './UserGoalEdit';
import UserGoalDelete from './UserGoalDelete';
import AssignmentList from '../assignments/AssignmentList';

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
  // const [username] = currentUser;

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
    if (hasLoaded && userGoal_id) {
      getCurrentUserGoal();
    } else {
      setCurrentUserGoal();
    }
  }, [userGoal_id, hasLoaded, usergoals]);

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
      <div className={styles.GoalTab}
        style={{
          color: eventKey===userGoal_id ? '#3c159c' : 'black',
          fontWeight: eventKey===userGoal_id ? 'bold' : 'normal'}}
          onClick={openUserGoal}
          ariel-label={eventKey===userGoal_id ? 'Click to open Users Goals' : 'Click to close Users goals'}
          // ariel-label={`${eventKey === userGoal_id ? 'Click to open' : 'Click to close'} ${username}'s Goals`}
          >
            {children}
            <div className={styles.TabControl}>
              {eventKey=== userGoal_id ? (
                <i className='fa-solid fa-angle-right'></i>
              ): (
                <i className='fa-solid fa-angle-left'></i>
              )}
            </div>
      </div>
    );
  };

  function UserGoalContext () {
    if (userGoalState==='view') {
      return currentUserGoal ? (
        <>
        <UserGoalsView {...currentUserGoal} userGoals={usergoals} setCurrentUserGoal={setCurrentUserGoal} setUserGoalState={setUserGoalState} />
        <div className={styles.NestedTasks}>
          <h3>Assignments for your goal</h3>
          <AssignmentList refine_id={refine_id} userGoal_id={userGoal_id} type='goal'/>
        </div>
        </>
      ) : (
        usergoals.results.length>0 ? (
          <div className={styles.GoalPlusMessage}>
            Click to view goal and any nested assignments.
          </div>
        ) : (
          <div className={styles.GoalPlusMessage}>
            Create a new goal
          </div>
        )
      )
    } else if (userGoalState==='create') {
      return <UserGoalCreate usergoals={usergoals} setUserGoals={setUserGoals} setUserGoalState={setUserGoalState} setKeyParameters={setKeyParameters} keyParameters={keyParameters}/>
    } else if (userGoalState==='edit') {
      return <UserGoalEdit {...currentUserGoal} usergoals={usergoals} setUserGoals={setUserGoals} setUserGoalState={setUserGoalState} /> 
    } else if (userGoalState==='delete') {
      return <UserGoalDelete {...currentUserGoal} usergoals={usergoals} setUserGoals={setUserGoals} setUserGoalState={setUserGoalState} setKeyParameters={setKeyParameters} keyParameters={keyParameters}/>
    }
  };

  return (
    <div className={styles.GoalSection}>
      <div className={styles.GoalList}>
        <h3>Goal List</h3>
        <p>Select a goal to view more</p>
        {hasLoaded ? (
          usergoals.results.length > 0 ? (
            usergoals.results.map(usergoal => (
              <ContextAwareToggle eventKey={usergoal.id} key={usergoal.id}>
                <p>{usergoal.title}</p>
              </ContextAwareToggle>
            ))
          ) : (
            <div className={styles.GoalTab}>
              <p>No goals yet</p>
            </div>
          )
        ) : (
          <div className={styles.SpinnerContainer}>
            <Spinner animation="border" />
            <p>We are just loading your goals</p>
          </div>
        )}
        <Button className={`${btnStyles.Button} ${styles.Button}`}  onClick={handleCreate}>
          <div>Add a goal</div>
        </Button>
      </div>
      <div className={styles.GoalPlus}>
        {hasLoaded ? (
          <UserGoalContext />
        ) : (
          <div className={styles.SpinnerContainer}>
            <Spinner animation="border" />
            <p>Just loading ...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserGoalSection