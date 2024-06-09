import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import {useCurrentUser} from '../context/CurrentUserContext';
import About from './About';

const Home = () => {

    const currentUser = useCurrentUser();

    const signedOutButtons = (
        <>
            <link to={'/signup'}>
                Ready to Sign up!!
            </link>
        </>
    );

    const signedInButtons = (
        <>
            <link to={'/organise'}>
            Get Organised!!
            </link>
            <link to={'/steps'}>
                Take a Step in the right direction!
            </link>
        </>
    );

  return (
    <div>
        <div>
            <div>
                <h1>Forge Focus</h1>
            </div>
            <h2>
                {currentUser ? ('Welcome ${currentUser.username}') : (
                    "Forge Ahead with Precision: Setting Goals, Refining Tasks.")}
            </h2>
        </div>
        {!currentUser && <About />}
        <div>
            {currentUser ? (signedInButtons) : (signedOutButtons)}
        </div>
    </div>
  )
}

export default Home