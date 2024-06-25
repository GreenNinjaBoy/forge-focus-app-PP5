import React from 'react';
import { axiosRes } from '../../api/axiosDefaults';
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/AssignmentsCreate.module.css';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';
import { Button } from 'react-bootstrap';

// Component for deleting an assignment
const AssignmentDelete = (props) => {
  // Destructuring props to extract variables
  const {
      id,
      name,
      assignments,
      setAssignments,
      setAssignmentState,
    } = props;
  
  // Hooks for setting global success messages
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  
  
  // Extracting assignment list from assignments prop
  const assignmentList = assignments.results;
  
  // Function to handle cancel action and revert to view state
  const handleCancel = () => {
    setAssignmentState('view');
  };

  // Function to handle delete action
  const handleDelete = async () => {
    try {
      // Sending delete request to the server
      await axiosRes.delete(`/assingment/${id}`);
      // Setting global success message
      setGlobalSuccessMessage("Assignment Deleted");
      setShowGlobalSuccess(true);
      // Removing deleted assignment from the list
      const assignmentIndex = assignmentList.findIndex(assignment => assignment.id === id);
      assignmentList.splice(assignmentIndex, 1);
      // Updating the assignments state with the new list
      setAssignments(
        { results: [
          ...assignmentList
        ]}
      );
    } catch(err){
      // Error handling can be implemented here
    }
  };

  // Render delete confirmation and action buttons
  return (
    <div className={styles.EditContainer}>
      <p className={styles.DeleteParagraph}>Delete Assignment: {name}?</p>
      <div>
        <Button className={`${btnStyles.Button} ${styles.Button}`}  onClick={handleCancel}>
          Cancel
        </Button>
        <Button className={`${btnStyles.Button} ${styles.Button}`}  onClick={handleDelete}>
          Delete
        </Button>
      </div>
  </div>
  )
}

export default AssignmentDelete