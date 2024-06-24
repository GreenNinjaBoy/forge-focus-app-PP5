import React, {useState} from 'react';
import styles from '../../styles/RefineDesktop.module.css';
import btnStyles from '../../styles/Button.module.css';
import pageStyles from '../../styles/Page.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import UserGoalSection from '../usergoals/UserGoalSection';
import RefineArea from './RefineArea';
import AssignmentList from '../assignments/AssignmentList';

const RefineDesktop = ({ id }) => {
  const [keyParameters, setKeyParameters] = useState({
    refine_id: id,
    userGoal_id: '',
  })

  const { refine_id } = keyParameters;

  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  }

  return (
    <div className={`${pageStyles.ContentContainer} ${styles.MainContainer}`}>
      <button className={btnStyles.BackCross} aria-label="Click to return to the plan" onClick={handleBack}>
        <i className="fa-solid fa-x"></i>
      </button>

      <RefineArea id={refine_id} />

      <div className={styles.LinkedDetailsContainer}>
        <UserGoalSection keyParameters={keyParameters} setKeyParameters={setKeyParameters}/>
        <div className={styles.DayToDayContainer}>
          <div className={styles.DayToDayInfo}>
            <h3>Day to day steps</h3>
            <p>(The little things that need doing!)</p>
          </div>
          <AssignmentList refine_id={refine_id} type="daytoday"/>
        </div>
      </div>
    </div>
  )
}

export default RefineDesktop