import React, { useContext, useState } from 'react'
import styles from '../../styles/RefineMobile.module.css';
import pageStyles from '../../styles/Page.module.css';
import accStyles from '../../styles/Accordion.module.css';
import btnStyles from '../../styles/Button.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { useAccordionToggle, AccordionContext } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AssignmentList from '../assignments/AssignmentList';
import UserGoalSectionMobile from '../usergoals/UserGoalsSectionMobile';
import RefineArea from './RefineArea';

const RefineMobile = ( {id} ) => {
  const [keyParameters, setKeyParameters] = useState({
    refine_id: id,
    usergoal_id: '',
  })

  const { refine_id } = keyParameters;

  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  }

  // function copied from React bootstrap and adjusted for my requiremnts
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
    <div className={`${pageStyles.ContentContainer} ${styles.MainContainer}`}>
      <button className={btnStyles.BackCross} aria-label="Click to return to the organiser" onClick={handleBack}>
        <i className="fa-solid fa-x"></i>
      </button>

      <RefineArea id={refine_id} />

      <Accordion>
        <Card>
          <Card.Header>
            <ContextAwareToggle as={Card.Header} eventKey="0">
              <h3>Day to day assignments</h3>
            </ContextAwareToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className={styles.BodyContainer}>
              <AssignmentList refine_id={refine_id} type="daytoday"/>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <UserGoalSectionMobile keyParameters={keyParameters} setKeyParameters={setKeyParameters}/>
      </Accordion>
    </div>
  )
}

export default RefineMobile