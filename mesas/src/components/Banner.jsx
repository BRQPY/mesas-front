import React from 'react';
import {Jumbotron, Container} from 'react-bootstrap'
import "../styles/jumbotron.css"
const Banner = () => (
    <Jumbotron className="BannerPrincipal" fluid color="dark">
        <Container>
            <h1 className="TituloBanner">Sistema de Gestión de Restaurantes</h1>
            <h3 className="SubtituloBanner"> Electiva Programación Web Backend FPUNA</h3>
        </Container>
    </Jumbotron>
)


export default Banner;