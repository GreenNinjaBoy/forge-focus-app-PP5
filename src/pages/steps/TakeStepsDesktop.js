import React, {useEffect, useState} from 'react';
import StepsTask from './StepsTask';
import styles from '../../styles/TakeSteps.module.css';
import pageStyles from '../../styles/Page.module.css';
import { Form, Spinner } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';

const TakeStepsDesktop = (props) => {
  const {
    hasLoaded,
    activeAssignments,
    setActiveAssignments,
    activeList,
    todayList,
    achievedList,
    setHasLoaded
  } = props;

  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("");
  const [searchList, setSearchList] = useState({ results: []});

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  useEffect(() => {
    if (query !== ""){
      const updateSearchList = async () => {
        try {
          setHasLoaded(false);
          const {data} = await axiosReq.get(`/assingment/?search=${query}`);
          setSearchList(data);
          setHasLoaded(true);
        }  catch(err) {
          //console.log(err)
        }
      };
      // Below sets fetchPosts to fire after a 1 second pause
      const timer = setTimeout(() => {
        updateSearchList();
      }, 1000)
      // Below cleans up and clears the timeout function
      return () => {
        clearTimeout(timer)
      }
    } else {
      setSearchList({ results: []});
    }
  }, [query, setHasLoaded])

  useEffect(() => {
    const changeActiveAssignmentsOrder = async () => {
      try {
        const {data} = await axiosReq.get(`/assignment/${filter}`);
        setActiveAssignments(data);
        setHasLoaded(true);
      }  catch(err) {
        //console.log(err)
      }
    };
    setHasLoaded(false);
    changeActiveAssignmentsOrder();
  }, [filter, setActiveAssignments, setHasLoaded])

  return (
    <div className={`${pageStyles.ContentContainer} ${styles.MainContainer}`}>

      <div className={styles.Column}>
        <div className={styles.TitleContainer}>
          <h2>Still to Complete</h2>
          <div className={styles.SearchContainer}>
            <Form onSubmit={(event) => event.preventDefault()}>
              <Form.Control
                type="text"
                className={styles.SearchInput}
                placeholder="Search assignments"
                value={query}
                onChange={(event) => setQuery(event.target.value)}/>
            </Form>
          </div>
          <div className={styles.Filter}>
            <label htmlFor="filter" className={styles.FilterLabel}>Order by:</label>
            <select id="filter" name="filter" onChange={handleFilter}>
              <option name="filter" value='?ordering=achieve_by'>Assignment deadline</option>
              <option name="filter" value='?ordering=-refine'>Refine Area</option>
              <option name="filter" value='?ordering=usergoal__achieve_by'>Set Goals</option>
              <option name="filter" value='?ordering=-created_at'>Newest Assignment</option>
            </select>
          </div>
        </div>
        <div className={styles.TasksContainer}>
          {hasLoaded ? (
            searchList.results.length>0 ? (
              searchList.results.map( assignment => (
                <StepsTask 
                  key={assignment.id}
                  {...assignment}
                  activeTasks={activeAssignments}
                  setActiveTasks={setActiveAssignments} 
                  type="active"/>
              ))
            ) : (
              activeList?.length>0 ? (
                activeList.map( assignment => (
                  <StepsTask 
                    key={assignment.id}
                    {...assignment}
                    activeAssignments={activeAssignments}
                    setActiveAssignments={setActiveAssignments} 
                    type="active"/>
                ))
              ) : (
                <p className={styles.AddPadding}>No assignemnts found.</p>
              )
            )
          ) : (
            <div className={styles.SpinnerContainer}>
              <Spinner animation="border" />
              <p>Loading assignemnts</p>
            </div>
          )}
        </div>
      </div>

      <div className={`${styles.Column} ${styles.MiddleColumn}`}>
        <div className={styles.TitleContainer}>
          <h2>Today</h2>
        </div>
        <div className={styles.TasksContainer}>
          {hasLoaded ? (
            todayList?.length>0 ? (
              todayList.map( assignment => (
                <StepsTask 
                  key={assignment.id}
                  {...assignment}
                  activeAssignemnts={activeAssignments}
                  setActiveAssignments={setActiveAssignments} 
                  type="today"/>
              ))
            ) : (
              <p className={styles.AddPadding}>No assignments set for today!</p>
            )
          ) : (
            <div className={styles.SpinnerContainer}>
              <Spinner animation="border" />
              <p >Assingments Loading</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.Column}>
        <div className={styles.TitleContainer}>
          <h2>Completed</h2>
        </div>
        <div className={styles.TasksContainer}>
        {hasLoaded ? (
            achievedList?.length>0 ? (
              achievedList.map( assignment => (
                <StepsTask 
                  key={assignment.id}
                  {...assignment}
                  activeAssignments={activeAssignments}
                  setActiveAssignments={setActiveAssignments} 
                  type="achieved"/>
              ))
            ) : (
              <p className={styles.AddPadding}>No Completed Assignments!</p>
            )
          ) : (
            <div className={styles.SpinnerContainer}>
              <Spinner animation="border" />
              <p>Assingments Loading</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TakeStepsDesktop