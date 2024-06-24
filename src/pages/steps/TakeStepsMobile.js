import React, {useContext, useEffect, useState} from 'react';
import styles from '../../styles/TakeSteps.module.css';
import accStyles from '../../styles/Accordion.module.css';
import { Accordion, Card, Form, Spinner, useAccordionToggle, AccordionContext } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import StepsTask from './StepsTask';

const TakeStepsMobile = ( props ) => {
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

   // function copied from React bootstrap and adjusted for my requirements
   function ContextAwareToggle({ children, eventKey, callback }) {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    return (
      <div
        className={accStyles.Header}
        style={{
          color: isCurrentEventKey ? '#3c159c' : 'black',
          fontWeight: isCurrentEventKey ? 'bold' : 'normal' }}
        onClick={decoratedOnClick}
      >
        {children}
        {isCurrentEventKey ? (
          <i className="fa-solid fa-angle-down"></i>
        ) : (
          <i className="fa-solid fa-angle-up"></i>
        )}
      </div>
    );
  }
  return (
    <Accordion className={styles.Accordion}>
      <Card>
        <Card.Header>
          <ContextAwareToggle as={Card.Header} eventKey="0">
            <h2>Still to complete</h2>
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body className={styles.AccordionBody}>
            <div className={styles.FunctionContainer}>
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
                  <option name="filter" value='?ordering=usergoal__achieve_by'> Set Goals</option>
                  <option name="filter" value='?ordering=-created_at'>Newest Assignment</option>
                </select>
              </div>
            </div>
            {hasLoaded ? (
              searchList.results.length>0 ? (
                searchList.results.map( assignment => (
                  <StepsTask 
                    key={assignment.id}
                    {...assignment}
                    activeAssignments={activeAssignments}
                    setActiveAssignments={setActiveAssignments} 
                    type="active"/>
                ))
              ) : (
                activeList?.length>0 ? (
                  activeList.map( assignment => (
                    <StepsTask 
                      key={assignment.id}
                      {...assignment}
                      activeAssignments={activeAssignments}
                      setActiveAssignemnts={setActiveAssignments} 
                      type="active"/>
                  ))
                ) : (
                  <p className={styles.AddPadding}>No assignemnts found</p>
                )
              )
            ) : (
              <div className={styles.SpinnerContainer}>
                <Spinner animation="border" />
                <p>Loading assignemnts</p>
              </div>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <ContextAwareToggle as={Card.Header} eventKey="1">
            <h2>Today</h2>
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            {hasLoaded ? (
              todayList?.length>0 ? (
                todayList.map( assignment => (
                  <StepsTask 
                    key={assignment.id}
                    {...assignment}
                    activeAssignments={activeAssignments}
                    setActiveAssignments={setActiveAssignments} 
                    type="today"/>
                ))
              ) : (
                <p className={styles.AddPadding}>No assignments found</p>
              )
            ) : (
              <div className={styles.SpinnerContainer}>
                <Spinner animation="border" />
                <p>Loading assignemnts</p>
              </div>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <ContextAwareToggle as={Card.Header} eventKey="2">
            <h2>Completed</h2>
          </ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body className={styles.AccordionBody}>
            {hasLoaded ? (
              achievedList?.length>0 ? (
                achievedList.map( assignment => (
                  <StepsTask 
                    key={assignment.id}
                    {...assignment}
                    activeAssignments={activeAssignments}
                    setActiveAssignemnts={setActiveAssignments} 
                    type="achieved"/>
                ))
              ) : (
                <p className={styles.AddPadding}>No Completed Assignments!</p>
              )
            ) : (
              <div className={styles.SpinnerContainer}>
                <Spinner animation="border" />
                <p>Loading assignments!</p>
              </div>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default TakeStepsMobile