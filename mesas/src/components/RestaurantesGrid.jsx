import React, {Fragment} from "react"
import axios from "axios"
import RestautanteCard from "./RestauranteCard"
import Banner from "./Banner"
import { Link } from "react-router-dom"
import { Container, Col, CardGroup, Button} from 'react-bootstrap'

class CategoriesGrid extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            category: []
        }
    }
    render() {
        const { category } = this.state
        return (
            <Fragment>
                <Banner />
                <Container>
                    <CardGroup>
                        {
                            category.map(c => 
                                (
                                    <Col xs={6} md={5}>
                                        <RestautanteCard 
                                            name={c.nombre}
                                            id = {c.id}
                                            direccion = {c.direccion}
                                        />
                                    </Col>
                                )
                            ) 
                        }
                    </CardGroup>
                    <br/>
                </Container>   
                <Container>
                    <Link to={`/reservas`}>
                        <Button variant="outline-info">Listar Reservas</Button>
                    </Link>
                </Container>
            </Fragment>           
        )
    }
    componentDidMount(){
        axios.get('http://localhost:9090/api/restaurantes/')
        .then(response => {this.setState({
            category: response.data
        })})
    }
}

export default CategoriesGrid