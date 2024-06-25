import React, {useState} from 'react';
import formStyles from '../../styles/Form.module.css';
import styles from '../../styles/AssignmentsCreate.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import { Alert, Form } from 'react-bootstrap';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../../context/GlobalMessageContext';

// Component for editing an assignment
const AssignmentEdit = (props) => {
  // Destructuring props to extract variables
  const {
    id,
    name,
    refine,
    usergoal,
    achieve_by,
    assignments,
    setAssignments,
    setAssignmentState,
    type
  } = props;

  // Hooks for setting global success messages
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();  

  // Function to convert date to a suitable format
  const convertedDate = () => {
    if (achieve_by !== null){
      const dateWithTime = new Date(achieve_by).toISOString()
      return dateWithTime.split('T')[0];
    } else {
      return '';
    } 
  };

  // Extracting assignment list from assignments prop
  const assignmentList = assignments.results;

  // State for form data
  const [taskData, setAssignmentData] = useState({
    newName: name,
    newRefine: refine,
    newUserGoal: usergoal,
    newAchieve_by: convertedDate(),
  })

  // Destructuring taskData for ease of use
  const {
    newName,
    newRefine,
    newUserGoal,
    newAchieve_by,
  } = taskData;

  // State for form errors
  const [errors, setErrors] = useState({});

  // Function to handle form field changes
  const handleChange = (event) => {
    setAssignmentData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to handle cancel action and revert to view state
  const handleCancel = () => {
    setAssignmentState("view");
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', newName)
    if (refine) {
      formData.append('refine', newRefine)
    };
    if (usergoal) {
      formData.append('usergoal', newUserGoal)
    }
    if (newAchieve_by) {
      const parts = newAchieve_by.split('-');
      const date = new Date(parts[0], parts[1] - 1, parts[2], 12);
      const djangoDate = date.toISOString();
      formData.append('achieve_by', djangoDate);
    }
    try {
      const {data} = await axiosReq.put(`/assignment/${id}`, formData);
      setGlobalSuccessMessage("Assignment Edit Successful");
      setShowGlobalSuccess(true);
      const assignmentIndex = assignmentList.findIndex(assignment => assignment.id === id);
      assignmentList[assignmentIndex] = data;
      setAssignments(
        { results: [
          ...assignmentList
        ]}
      );
      setAssignmentState("view");
    } catch(err){
      console.log(err);
      if (err.response?.status !== 401){
        setErrors(err.response?.data);
      }
    }
  };

  // Render form for editing assignment
  return (
    <div className={styles.EditContainer}>
      <Form onSubmit={handleSubmit}>
        <div className={styles.MainForm}>

          {errors.name?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId={`new-name-${type}`} className={styles.Group}>
            <Form.Label className={styles.FormLabel} >Assignment:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task name"
              name="newName"
              value={newName}
              onChange={handleChange}
              className={styles.EditInput}
            />
          </Form.Group>

          {errors.deadline?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId={`new-deadline-${type}`} className={styles.Group}>
            <Form.Label>Achieve By:</Form.Label>
            <Form.Control
              type="date"
              name="newDeadline"
              value={newAchieve_by}
              onChange={handleChange}
              className={styles.DateInput}
            />
          </Form.Group>

        </div>
        {errors.non_field_errors?.map((message, idx) => (
          <Alert key={idx} className={formStyles.ErrorAlert}>
            {message}
          </Alert>
        ))}
        <div className={styles.EditIconContainer}>
          <button type="submit" aria-label="Click to save assignment">
          <i className="fa-solid fa-floppy-disk"></i>
          </button>
          <button className={styles.EditIcon} onClick={handleCancel} aria-label="Click to cancel">
            <i className="fa-regular fa-rectangle-xmark"></i>
          </button>
        </div>
      </Form>
    </div>
  )
}

export default AssignmentEdit