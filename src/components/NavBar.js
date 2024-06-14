import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUserContext } from '../context/CurrentUserContext';
import axios from 'axios';
import { removeTokenTimestamp } from '../utils/Utils';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../context/GlobalMessageContext';
import { Navbar, Container, Nav } from 'react-bootstrap';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';


const NavBar = () => {

    const {expanded, setExpanded, ref} = useClickOutsideToggle();

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUserContext();

    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

    const handleSignout = async () => {
        try {
            await axios.post(`dj-rest-auth/logout/`);
            setGlobalSuccessMessage("Successfully Signed out..");
            setShowGlobalSuccess(true);
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch(err) {
            console.log(err)
        }
    }

    const loggedOutLinks = (
        <>
        <NavLink to="/signin"> Sign In</NavLink>
        </>
    );

    const loggedInLinks = (
        <>
        <NavLink to="/refine">Refine Yourself</NavLink>
        <NavLink to="/organise">Organise</NavLink>
        <NavLink onClick={handleSignout} to="/"> Sign Out</NavLink>
        </>
    );

    return (
        <Navbar expanded={expanded} expand="md" fixed="top">
            <NavLink to="/">
            <div>
                <div>
                <h2>Forge Focus</h2>
                </div>
            </div>
        </NavLink>
            <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
            />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
                {currentUser ? (loggedInLinks) : (loggedOutLinks)}
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default NavBar

