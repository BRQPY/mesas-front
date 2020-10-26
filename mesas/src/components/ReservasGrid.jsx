import React from "react";
import axios from "axios";
import { Formik } from "formik";
import { Container, Col, Row, Form, Button, Table } from "react-bootstrap";
import "../styles/profileproveedor-style.css";

class ReservasGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantes: [],
      reservas: {},
      mostrar_tabla: false,
      clientes: [],
      cliente: {},
    };
  }
  render() {
    const { restaurantes } = this.state;
    const { clientes } = this.state;
    
    return (
      <Container>
        <h1>Reservas</h1>
        <br />
        <Formik
          onSubmit={(values) => {
            let objBusqueda = {
                "restauranteId": values.restaurantes,
                "fecha": values.fecha,
                "clienteId": values.clientes
            };
            axios
            .post(
                "http://localhost:9090/api/reservas/filter",
                objBusqueda
            )
            .then((response) => {
              console.log("Reservas: ", response.data);  
              this.setState({
                reservas: response.data,
                mostrar_tabla: true,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
            }
          }     
          initialValues={{
            opciones: [],
            fecha: "",
            clientes: "",
            restaurantes: ""
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="restaurantes">
                  <Form.Label>Seleccione un Restaurante</Form.Label>
                  <Form.Control
                    size="sm"
                    as="select"
                    name="restaurantes"
                    value={values.restaurantes}
                    onChange={handleChange}
                  >
                    <option value="" selected disabled hidden>
                      Elija aquí
                    </option>
                    {restaurantes.map((c) => (
                      <option value={c.id}>
                        {c.nombre} {c.apellido}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="clientes">
                  <Form.Label>Seleccione un Cliente</Form.Label>
                  <Form.Control
                    size="sm"
                    as="select"
                    name="clientes"
                    value={values.clientes}
                    onChange={handleChange}
                  >
                    <option value="" selected disabled hidden>
                      Elija aquí
                    </option>
                    {clientes.map((c) => (
                      <option value={c.id}>
                        {c.nombre} {c.apellido}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group>
                <input type="date" name="fecha" onChange={handleChange}></input>
              </Form.Group>
              <Row>
                <Col xs="auto">
                  <Button type="submit" variant="outline-info">
                    Buscar Reservas
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        <br />

        {this.state.mostrar_tabla ? (
          <>
            <h2>Listado de reservas</h2>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Restaurante</th>
                  <th>Cliente</th>
                  <th>Mesa</th>
                  <th>Fecha</th>
                  <th>Horario</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {this.state.reservas.map((reserva) => (
                  <tr>
                    <td>{reserva.restauranteId}</td>
                    <td>{reserva.clienteId}</td>
                    <td>{reserva.mesaId}</td>
                    <td> {reserva.fecha.substr(0,10)} </td>
                    <td> {reserva.horario} </td>
                    <td> {reserva.cantidad} </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : null}
      </Container>
    );
  }
  componentDidMount() {
    //Restaurante desde el backend
    axios.get("http://localhost:9090/api/clientes").then((response) => {
      this.setState({
        clientes: response.data,
      });
    });
    axios.get("http://localhost:9090/api/restaurantes").then((response) => {
        this.setState({
          restaurantes: response.data,
        });
      });
  }
}

export default ReservasGrid;
