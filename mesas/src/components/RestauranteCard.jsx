import React from "react"
import "../styles/card-style.css"
import { Link } from "react-router-dom"
import { Card, Button } from 'react-bootstrap'

const CategoriesCard = ({ name, id, direccion}) => (

    <Card style={{ width: '10rem' }} className="CardCategorias">
        <Link to={`/restaurante/perfil/${id}`}>
            <Card.Img variant="top" 
                src={require("../media/restaurante.jpg")}
                width="30"
                height="30" />
        </Link>

        <Card.Body className="CardCategoriasBody"> 
            <Card.Title className="CardCategoriastitle">{name} </Card.Title>
            <Card.Text className="card-categorias-text">
                {direccion}
            </Card.Text>
            <Link to={`/restaurante/perfil/${id}`}>
                <Button variant="outline-info">Acceder</Button>
            </Link>
        </Card.Body>
    </Card>


)

export default CategoriesCard