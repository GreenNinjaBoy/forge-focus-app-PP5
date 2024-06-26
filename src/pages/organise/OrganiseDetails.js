import React, {useContext, useEffect, useState }from 'react';
import btnStyles from '../../styles/Button.module.css';
import accStyles from '../../styles/Accordion.module.css';
import cardStyles from '../../styles/Cards.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Accordion, Card, Spinner } from 'react-bootstrap';
import { useAccordionToggle, AccordionContext } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import defaultImage from '../../assets/default-image.webp';
import RefineDesktopHighlight from '../refine/RefineDesktopHighlight';
import RefineMobileHighlight from '../refine/RefineMobileHighlight';

const OrganiseDetails = ( {mobile}) => {
  const [refinements, setRefinements] = useState({ results: []});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchRefinements = async () => {
      try {
        const {data} = await axiosReq.get('/refine/');
        setRefinements(data);
        setHasLoaded(true);
      } catch(err) {
        console.log(err)
      }
    };
    setHasLoaded(false);
    fetchRefinements();
  }, []);

  // function copied from React bootstrap and adjusted for my requirements.
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
          <i className={`fa-solid fa-angle-down`}></i>
        ) : (
          <i className={`fa-solid fa-angle-up`}></i>
        )}
      </div>
    );
  }

  return (
    <div>
      {hasLoaded ? (
        <>
          {mobile ? (
            <Accordion className={accStyles.Accordion}>
              {refinements.results.length>0 ? (
                refinements.results.map(refine=> (
                  <RefineMobileHighlight key={refine.id} {...refine} />
                ))
              ) : (
                <Card>
                  <Card.Header>
                    <ContextAwareToggle as={Card.Header} eventKey="0">
                      <div className={accStyles.Title}>
                        <img className={accStyles.Image} src={defaultImage} alt='refinement'/>
                        <h2>Your areas for Refinement</h2>
                      </div>
                    </ContextAwareToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <p>Refine the areas of your life you wish to focus on by creating refinements</p>
                      <p>Once created all your refinement areas will be viewable here in your organiser.</p>
                      <p>Within each refinement area, you can set yourself assignments and add the steps you need to complete to achieve them, as well as any day to day steps linked with that area of your life.</p>
                      <div className={cardStyles.ButtonContainer}>
                        <Link className={`${btnStyles.Button} ${cardStyles.Button}`} to={'/refine/create'}>
                          Create your first refinement
                        </Link>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              )}

              <Card>
                <Card.Header>
                  <ContextAwareToggle as={Card.Header} eventKey="99">
                    <div className={accStyles.Title}>
                      <img className={accStyles.Image} alt='miscellaneous'/>
                      <h2>Miscellaneous</h2>
                    </div>
                  </ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="99">
                  <Card.Body>
                    <p>A place for tasks that don't fit into any of your refinement areas.</p>
                    <div className={cardStyles.ButtonContainer}>
                      <Link className={`${btnStyles.Button} ${cardStyles.Button}`} to={'/miscellaneous'} >
                        Go to miscellaneous area
                      </Link>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ) : (
            <div className={cardStyles.CardsContainer}>
              {refinements.results.length>0 ? (
                refinements.results.map(refine => (
                  <RefineDesktopHighlight key={refine.id} {...refine} />
                ))
              ) : (
                <div className={cardStyles.Card}>
                  <div className={cardStyles.Header}>
                    <img className={cardStyles.Image} src={defaultImage} alt='refine'/>
                    <div className={cardStyles.Title}>
                      <h2>Your Refinement areas</h2>
                    </div>
                  </div>
                  <div className={`${cardStyles.GoalContainer} ${cardStyles.AddPadding}`}>
                  <p>Refine the areas of your life you wish to focus on by creating refinements</p>
                      <p>Once created all your refinement areas will be viewable here in your organiser.</p>
                      <p>Within each refinement area, you can set yourself assignments and add the steps you need to complete to achieve them, as well as any day to day steps linked with that area of your life.</p>
                  </div>
                  <div className={cardStyles.ButtonContainer}>
                    <Link className={`${btnStyles.Button} ${cardStyles.Button}`}  to={'/refine/create'}>
                      Create your first refinement
                    </Link>
                  </div>
                </div>
              )}
              <div className={cardStyles.Card}>
                <div className={cardStyles.Header}>
                  <img className={cardStyles.Image}  alt='miscellaneous'/>
                  <div className={cardStyles.Title}>
                    <h2>Miscellaneous</h2>
                  </div>
                </div>
                <div className={`${cardStyles.GoalContainer} ${cardStyles.AddPadding}`}>
                  <p>A place for your steps that don't fit into any refinement areas.</p>
                </div>
                <div className={cardStyles.ButtonContainer}>
                  <Link className={`${btnStyles.Button} ${cardStyles.Button}`} to={'/miscellaneous'}>
                    Go to miscellaneous area
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={cardStyles.SpinnerContainer}>
          <Spinner animation="border" />
          <h2>We are just loading your refinements</h2>
        </div>
      )}
    </div>
  )
}

export default OrganiseDetails