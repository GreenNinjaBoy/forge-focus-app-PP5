import React from "react";
import btnStyles from '../../styles/Button.module.css';
import pageStyles from '../../styles/Page.module.css';
import OrganiseDetails from "./OrganiseDetails";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCheckedUser, useCurrentUser } from "../../context/CurrentUserContext";

const Organise = () => {

    const currentUser = useCurrentUser();
    const checkedUser = useCheckedUser();

    return (
    <div className={pageStyles.PageContainer}>
      {checkedUser ? (
        <>
          <div className={pageStyles.Title}>
            <h1>{currentUser.username}'s Plan</h1>
          </div>      
          <div className={btnStyles.ButtonContainer}>
            <Link className={btnStyles.Button} to={'/refine/create'}>
              Create new refinement
            </Link>
          </div>
          <div className={pageStyles.MobileOnly} >
            <OrganiseDetails mobile />
          </div>
          <div className={pageStyles.DesktopOnly}>
            <OrganiseDetails />
          </div>
        </>
      ) : (
        <div>
          Just fetching you data.........
        </div>
      )}
    </div>
  )
}

export default Organise