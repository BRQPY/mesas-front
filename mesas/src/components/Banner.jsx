import React from 'react';
import {Jumbotron, Container} from 'react-bootstrap'
import "../styles/jumbotron.css"
const Banner = () => (
    <Jumbotron className="banner-principal" fluid>
        <Container>
            <h1>Restaurantes</h1>
        </Container>
    </Jumbotron>
)


export default Banner;