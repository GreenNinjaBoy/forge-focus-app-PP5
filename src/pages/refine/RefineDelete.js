import React from 'react';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/RefineView.module.css';
import { Button } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';

const RefineDelete = (props) => {
  const {
    id,
    name,
    image,
    setRefineState,
  } = props;

  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  const history = useHistory();

  const handleCancel = () => {
    setRefineState('view');
  };

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/refine/${id}`);
      setGlobalSuccessMessage("You have deleted your refinement");
      setShowGlobalSuccess(true);
      history.push('/organise')
    } catch(err){
      //console.log(err)
    }
  };
  return (
    <div className={styles.ViewContainer}>
      <img className={styles.Image} src={image} alt='Refinement'/>
      <div className={styles.ConfirmDelete}>
        <p>Are you sure you wish to delete your refinement: {name}?</p>
        <p>Deleting it will also result in all assignments and steps within this refinement being deleted!</p>
        <div>
          <Button className={`${btnStyles.Button} ${styles.Button}`}   onClick={handleCancel}>
            <div className={styles.InnerButton}>
              Cancel
            </div>
          </Button>
          <Button className={`${btnStyles.Button} ${styles.Button}`} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RefineDelete