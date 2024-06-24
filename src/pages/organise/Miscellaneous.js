import React from 'react';
import styles from '../../styles/Miscellaneous.module.css';
import pageStyles from '../../styles/Page.module.css';
import btnStyles from '../../styles/Button.module.css';
import { useCheckedUser, useCurrentUser } from '../../context/CurrentUserContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import AssignmentList from '../assignments/AssignmentList'


const Miscellaneous = () => {
  const currentUser = useCurrentUser();
  const checkedUser = useCheckedUser();

  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  }

  return (
    <div className={pageStyles.PageContainer}>
      {checkedUser ? (
        <>
          <div className={pageStyles.Title}>
            <h1>{currentUser.username}'s Plan</h1>
          </div>      
          <div className={`${pageStyles.ContentContainer} ${styles.MainContainer}`}>
            <button className={btnStyles.BackCross} aria-label="Click to return to organiser" onClick={handleBack}>
              <i className="fa-solid fa-x"></i>
            </button>
            <div className={styles.Title}>
              <img className={styles.Image} src='' alt='miscellaneous'/>
              <h2>Miscellaneous</h2>
            </div>
            <div className={styles.TaskList}>
              <AssignmentList type="miscellaneous"/>
            </div>
          </div>
        </>
      ) : (
        <div>
          Just loading your data ....
        </div>
      )}
    </div>  
  )
}


export default Miscellaneous