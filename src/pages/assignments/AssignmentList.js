import React, {useState, useEffect} from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import IndividualAssignment from './IndividualAssignment';
import AssignmentCreate from './AssignmentCreate';

const AssignmentList = ( props ) => {

  const { refine_id, userGoal_id, type } = props;

  const [assignments, setAssignments] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (type==="daytoday") {
        try {
          const {data} = await axiosReq.get(`/assignments/?refine=${refine_id}&usergoal=None`);
          setAssignments(data);
          setHasLoaded(true);
        } catch(err) {
          console.log(err)
        }
      } else if (type==="usergoal") {
        try {
          const {data} = await axiosReq.get(`/assignment/?usergoal=${userGoal_id}`);
          setAssignments(data);
          setHasLoaded(true);
        } catch(err) {
          console.log(err)
        }
      } else if (type==="miscellaneous") {
        try {
          const {data} = await axiosReq.get('/assignments/?refine=None');
          setAssignments(data);
          setHasLoaded(true);
        } catch(err) {
          console.log(err)
        }
      }
    };
    setHasLoaded(false);
    fetchAssignments();
  }, [redfine_id, userGoal_id, type]);

  function CreateContext() {
    if (type==="daytoday") {
      return <AssignmentCreate type={type} refine_id={refine_id} assignments={assignments} setAssignments={setAssignments}/>
    } else if (type==="usergoal") {
      return <AssignmentCreate type={type} refine_id={refine_id} userGoal_id={userGoal_id} assignments={assignments} setAssignments={setAssignments}/>
    } else if (type==="miscellaneous") {
      return <AssignmentCreate type={type} assignments={assignments} setAssignments={setAssignments}/>
    } 
  };

  return (
    <div>
      <div>
        {hasLoaded ? (
          assignments.results.length ? (
            assignments.results.map(task => (
              <IndividualAssignment key={task.id} type={type} assignment={assignment} refine_id={refine_id} userGoal_id={userGoal_id} assignments={assignments} setAssignments={setAssignments}/>
            ))
          ) : (
            <div>
              <p>No assignments create one below</p>
            </div>
          )
        ) : (
            <div>
              <Spinner animation="border" />
              <p>Loading Assignments</p>
            </div>
        )}
      </div>
      <AssignmentContext />
    </div>
  )
}


export default AssignmentList