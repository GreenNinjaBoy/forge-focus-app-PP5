import React from 'react';
import pageStyles from '../../styles/Page.module.css';
import { useCheckedUser, useCurrentUser } from '../../context/CurrentUserContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import RefineMobile from './RefineMobile';
import RefineDestop from './RefineDesktop';

const Refine = () => {

    const currentUser = useCurrentUser();
    const checkedUser = useCheckedUser();
    const { id } = useParams();

  return (
    <div className={pageStyles.PageContainer}>
        {checkedUser ? (
            <>
                <div className={pageStyles.Title}>
                    <h1>Time to Refine {currentUser.username}</h1>
                </div>
                <div className={pageStyles.MobileOnly}>
                    <RefineMobile id={id} />
                </div>
                <div className={pageStyles.DesktopOnly}>
                    <RefineDestop id={id} />
                </div>
            </>
        ) : (
            <div>
                Just getting your Refinement Information ....
            </div>
        )}
    </div>
  )
}

export default Refine