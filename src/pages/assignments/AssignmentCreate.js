import React, {useState} from 'react';
import { Alert, Form } from 'react-bootstrap';
import formStyles from '../../styles/Form.module.css';
import styles from '../../styles/AssignmentsCreate.module.css';
import { axiosReq } from '../../api/axiosDefaults';
import {useSetGlobalSuccessMessage, useSetShowGlobalSuccess} from '../../context/GlobalMessageContext';

// Component for creating assignments
const AssignmentCreate = ( props) => {
  // Destructuring props to extract variables
  const {
    refine_id,
    usergoal_id,
    assignments,
    setAssignments,
    type
  } = props;

  // Hooks for setting global success messages
  const setShowGlobalSuccess = useSetShowGlobalSuccess();
  const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

  // Extracting assignment list from assignments prop
  const assignmentList = assignments.results;

  // State for managing assignment data form
  const [assignmentData, setAssignmentData] = useState ({
    name:'',
    refine: refine_id,
    usergoal: usergoal_id,
    achieve_by: '',
  });

  // Destructuring assignmentData for easy access
  const {
    name,
    refine,
    usergoal,
    achieve_by,
  } = assignmentData;

  // State for managing form errors
  const [errors, setErrors] = useState({});

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name)
    if (refine) {
      formData.append('refine', refine)
    };
    if (usergoal) {
      formData.append('usergoal', usergoal)
    }
    if (achieve_by) {
      const parts = achieve_by.split('-');
      const date = new Date(parts[0], parts[1] -1, parts[2], 12);
      const djangoDate = date.toISOString();
      formData.append('achieve_by', djangoDate);
    }
    try {
      const {data} = await axiosReq.post(`/assignment/`, formData);
      setGlobalSuccessMessage("New assignment created");
      setShowGlobalSuccess(true);
      setAssignments(
        { results: [
          ...assignmentList,
          data
        ]}
      );
      setAssignmentData({
        name: '',
        refine: refine_id,
        usergoal: usergoal_id,
        achieve_by: '',
      });
    } catch(err){
      console.log(err);
      if (err.response?.status !==401) {
        setErrors(err.response?.data);
      }
    }
  };

  // Function to handle changes in form inputs
  const handleChange = (event) => {
    setAssignmentData({
      ...assignmentData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to reset form and errors
  const handleCancel = (event) => {
    event.preventDefault();
    setErrors({});
    setAssignmentData({
      name: '',
      refine: refine_id,
      usergoal: usergoal_id,
      achieve_by: '',
    });
  };

  // Render form for creating assignments
  return (
    <div className={styles.FormContainer}>
      <h4>Add {type} Assingment </h4>
      <Form onSubmit={handleSubmit}>
        <div className={styles.MainForm}>

          {errors.name?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
          <Form.Group controlId={`name-${type}`} className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Assingment:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Assingment name"
              name="name"
              value={name}
              onChange={handleChange}
              className={styles.TaskInput}
            />
          </Form.Group>

          {errors.deadline?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}

          <Form.Group controlId={`deadline-${type}`}className={styles.Group}>
            <Form.Label className={styles.FormLabel}>Deadline:</Form.Label>
            <Form.Control
              type="date"
              name="deadline"
              value={achieve_by}
              onChange={handleChange}
              className={styles.DateInput}
            />
          </Form.Group>

          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} className={formStyles.ErrorAlert}>
              {message}
            </Alert>
          ))}
        </div>
        <div className={styles.IconContainer}>
          <button type="submit" aria-label="save assignment">
          <i className="fa-solid fa-floppy-disk"></i>
          </button>
          <button className={styles.Icon} onClick={handleCancel} aria-label="Click to cancel">
            <i className="fa-regular fa-rectangle-xmark"></i>
          </button>
        </div>
      </Form>
    </div>
  )
}

export default AssignmentCreate