import React from "react"
import {Link} from "react-router-dom"
import "../styles/navbar-style.css"
import {Navbar, Nav, Container} from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'

const NavBarHeader = () => (
    <header>
        <Container>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                    <Link to="/">
                        {'PWBE!'}
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <LinkContainer to="/" style={{ cursor: 'pointer' }}>
                            <Nav.Link>Inicio</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/reservas" style={{ cursor: 'pointer' }}>
                            <Nav.Link>Listado de Reservas</Nav.Link>
                        </LinkContainer> 
                    </Nav>           
                </Navbar.Collapse>
            </Navbar>
        </Container>
    </header>
)

export default NavBarHeader
