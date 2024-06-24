import React, {useEffect, useState} from 'react';
import btnStyles from '../../styles/Button.module.css';
import cardStyles from '../../styles/Cards.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { axiosReq } from '../../api/axiosDefaults';
import { Spinner } from 'react-bootstrap';
import UserGoalHighlight from '../usergoals/UserGoalHighlight';


const RefineDesktopHighlight = (props) => {
  const {
    name,
    why,
    image,
    id,
  } = props;

  const [userGoals, setUserGoals] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchUserGoals = async () => {
      try {
        const {data} = await axiosReq.get(`/goals/?refine_id=${id}`);
        setUserGoals(data);
        setHasLoaded(true);
      } catch(err) {
        //console.log(err)
      }
    };
    setHasLoaded(false);
    fetchUserGoals();
  }, [id]);
  
  return (
    <div className={cardStyles.Card}>
    <div className={cardStyles.Header}>
      <img className={cardStyles.Image}  src={image} alt={`${name} refine`}/>
      <div className={cardStyles.Title}>
        <h2>{name}</h2>
        <p>{why}</p>
      </div>
    </div>
    <div className={cardStyles.GoalContainer}>
      {hasLoaded ? (
        <>
          {userGoals.results.length ? (
            userGoals.results.map(userGoals => (
              <UserGoalHighlight key={userGoals.id} {...userGoals} />
            ))
          ) : (
            <div className={cardStyles.AddPadding}>
              <p>You don't have any goals set for this refinement.</p>
            </div>
          )}
        </>
      ) : (
        <>
        <div className={cardStyles.SpinnerContainer}>
          <Spinner animation="border" />
          <p>Loading User Goals</p>
        </div>
        </>
      )}
    </div>
    <div className={cardStyles.ButtonContainer}>
      <Link  className={`${btnStyles.Button} ${cardStyles.Button}`} to={`/refine/${id}`}>
        Go to refinement
      </Link>
    </div>
  </div>
  )
}

export default RefineDesktopHighlight