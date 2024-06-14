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

    

    return (
        <Navbar bg="light" expand="md">
            <Container>
                <Navbar.Brand className='mr-auto' to="#home">ForgeFocus</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link to="/home">About</Nav.Link>
                        <Nav.Link to="/Signin">Signup/Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar

