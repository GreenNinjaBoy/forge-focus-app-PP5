import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'


const NavBar = () => {
    return (
        <Navbar bg="light" expand="md">
            <Container>
                <Navbar.Brand className='mr-auto' href="#home">ForgeFocus</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home">About</Nav.Link>
                        <Nav.Link href="#link">Signup/Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar

