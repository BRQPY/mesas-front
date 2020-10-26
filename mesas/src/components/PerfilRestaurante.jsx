import React from "react";
import axios from "axios";
import { Formik } from "formik";
import { Container, Col, Row, Form, Button, Table } from "react-bootstrap";
import "../styles/profileproveedor-style.css";

class PerfilRestaurante extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurante: [],
      mesas: {},
      mostrar_tabla: false,
      clientes: [],
      cliente: {},
    };
  }
  reservar() {
    let formPost = {
      cantidad: 5,
      horario: "12-13",
      fecha: "2020-03-05",
      restauranteId: 1,
      clienteId: 1,
      mesaId: 1,
    };
  }
  render() {
    const { restaurante } = this.state;
    const { mesas } = this.state;
    const { clientes } = this.state;
    const { cliente } = this.state;
    var horas = [];
    var fecha = "";
    const checkboxOptiones = [
      { key: "12-13", value: "12-13" },
      { key: "13-14", value: "13-14" },
      { key: "14-15", value: "14-15" },
      { key: "15-16", value: "15-16" },
      { key: "16-17", value: "16-17" },
      { key: "17-18", value: "17-18" },
      { key: "18-19", value: "18-19" },
      { key: "19-20", value: "19-20" },
      { key: "20-21", value: "20-21" },
      { key: "21-22", value: "21-22" },
      { key: "22-23", value: "22-23" },
    ];
    return (
      <Container>
        <h1>Restaurante: {restaurante.nombre}</h1>
        <br />
        <Formik
          onSubmit={(values) => {
            
            axios
              .get(`http://localhost:9090/api/clientes/${values.clientes}`)
              .then((response) => {
                this.setState({
                  cliente: response.data,
                });
              });
            
            values.opciones.map((o) =>{
              let objBusqueda = {
                restauranteId: restaurante.id,
                fecha: values.fecha,
                horario: o,
              };
              axios
                .post(
                  "http://localhost:9090/api/mesas/disponibles",
                  objBusqueda
                )
                .then((response) => {
                  this.setState({
                    mesas: response.data,
                    mostrar_tabla: true,
                  });
                  horas.push({ o });
                })

                .catch(function (error) {
                  console.log(error);
                })
              }
            );

          }}
          initialValues={{
            opciones: [],
            fecha: "",
            clientes: "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {checkboxOptiones.map((c) => (
                <Form.Check
                  inline
                  key={c.key}
                  id={c.key}
                  name="opciones"
                  label={c.value}
                  value={c.value}
                  onChange={handleChange}
                  checked={values.opciones.includes(c.value)}
                />
              ))}
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
                    Buscar mesas
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        <br />

        {this.state.mostrar_tabla ? (
          <>
            <h2>Listado de mesas disponibles</h2>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Piso</th>
                  <th>Capacidad</th>
                  <th>A nombre de</th>
                  <th>Reservar</th>
                </tr>
              </thead>
              <tbody>
                {this.state.mesas.map((m) => (
                  <tr>
                    <td>{m.nombre}</td>
                    <td>{m.piso}</td>
                    <td>{m.capacidad}</td>
                    <td>
                      {this.state.cliente.nombre} {this.state.cliente.apellido}
                    </td>
                    <td>
                      <Button
                        type="submit"
                        variant="outline-light"
                        onClick={this.reservar(
                          this.state.cliente.id,
                          m.id,
                          this.state.restaurante.id
                        )}
                      >
                        Reservar
                      </Button>
                    </td>
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
    axios
      .get(
        `http://localhost:9090/api/restaurantes/${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({
          restaurante: response.data,
        });
      });
    axios.get("http://localhost:9090/api/clientes").then((response) => {
      this.setState({
        clientes: response.data,
      });
    });
  }
}

export default PerfilRestaurante;
