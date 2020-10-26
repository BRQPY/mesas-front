import React from "react";
import axios from "axios";
import { Formik } from "formik";
import { Container, Col, Row, Form, Button, Table } from "react-bootstrap";
import "../styles/profileproveedor-style.css";
import ListaMesas from "./ListaMesas";

class PerfilRestaurante extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurante: [],
      mesas: {},
      mostrar_tabla: false,
      clientes: [],
      cliente: [],
      fecha: "",
      horarios: [],
      mesa_reserva: {},
      mostrar_form_reserva_con_cliente: false,
    };
  }
  reservar(cliente, mesa, restaurante, fecha, horas) {
    {
      horas.map((h) => {
        let formPost = {
          cantidad: mesa.capacidad,
          horario: h,
          fecha: fecha,
          restauranteId: restaurante.id,
          clienteId: cliente.id,
          mesaId: mesa.id,
        };
      });
    }
  }
  render() {
    const { restaurante } = this.state;
    const { mesas } = this.state;
    const { clientes } = this.state;
    const { cliente } = this.state;
    const { horarios } = this.state;
    const { mesa_reserva } = this.state;
    let horas_reserva = [];
    var fecha_reserva = "";
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
            fecha_reserva = values.fecha;

            values.opciones.map((o) => {
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
                    fecha: fecha_reserva,
                  });
                  horas_reserva.push({ o });
                  this.setState({
                    horarios: horas_reserva,
                  });
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
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
                <Col sm={6} lg={6}>
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
                </Col>
                <Col sm={6} lg={6}>
                  <br />
                  <input
                    type="date"
                    name="fecha"
                    onChange={handleChange}
                  ></input>
                </Col>
              </Form.Row>

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
            <ListaMesas
              cliente={this.state.cliente}
              mesas={this.state.mesas}
              fecha={fecha_reserva}
              horas={horas_reserva}
            />
            <h2>Buscar usuario</h2>
            <Formik
              onSubmit={(values) => {
                // get cliente seleccionada
                axios
                  .get(`http://localhost:9090/api/clientes/${values.cedula}`)
                  .then((response) => {
                    this.setState({
                      cliente: response.data,
                    });
                  });
                if (cliente.length === 0) {
                  this.setState({
                    mostrar_form_reserva_con_cliente: false,
                  });
                  alert("No existe un cliente con esa cédula");
                } else {
                  this.setState({
                    mostrar_form_reserva_con_cliente: true,
                  });
                }
              }}
              initialValues={{
                cedula: "",
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <Col sm={6} lg={6}>
                      <Form.Label>Ingrese la cédula del Usuario</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="5409702"
                        onChange={handleChange}
                        name="cedula"
                        value={values.cedula}
                      />
                    </Col>
                  </Form.Row>
                  <Button type="submit" variant="outline-info">
                    Buscar
                  </Button>
                </Form>
              )}
            </Formik>

            <h2>Formulario de Reserva</h2>
            <Formik
              onSubmit={(values) => {
                if (this.state.mostrar_form_reserva_con_cliente === false) {
                  // debe crear primero el cliente
                  // prepara el objeto cliente
                  console.log("primero aca")
                  let objCliente = {
                    nombre: values.nombre,
                    apellido: values.apellido,
                    cedula: values.cedula,
                  };
                  // lamada post para crear el cliente
                  axios
                    .post("http://localhost:9090/api/clientes", objCliente)
                    .then(function (response) {
                      console.log("Se creó el cliente");
                    })
                    .catch(function (error) {
                      console.log(error);
                      alert("No se pudo crear el cliente");
                    });
                  axios
                    .get(`http://localhost:9090/api/mesas/${values.mesa}`)
                    .then((response) => {
                      this.setState({
                        mesa_reserva: response.data,
                      });
                    });
                  // Si encontro un cliente en el form anterior de busqueda, efectua la reserva
                  {
                    // se recorre todos los horarios para crear un reserva en esa mesa en ese horario
                    horarios.map((h) => {
                      // se crea el objeto reserva para enviar via post
                      let objReserva = {
                        cantidad: mesa_reserva.capacidad,
                        fecha: this.state.fecha,
                        horario: h.o,
                        restauranteId: restaurante.id,
                        clienteId: cliente.id,
                        mesaId: mesa_reserva.id,
                      };
                      console.log(objReserva);
                      axios
                        .post("http://localhost:9090/api/reservas", objReserva)
                        .then(function (response) {
                          alert("Se reservó correctamente!");
                          window.location = "/";
                        })
                        .catch(function (error) {
                          console.log(error);
                          alert("Error, intente de nuevo");
                        });
                    });
                  }
                } else {
                  // Ya se tenia un cliente
                  axios
                    .get(`http://localhost:9090/api/mesas/${values.mesa}`)
                    .then((response) => {
                      this.setState({
                        mesa_reserva: response.data,
                      });
                    });
                  // Si encontro un cliente en el form anterior de busqueda, efectua la reserva
                  {
                    // se recorre todos los horarios para crear un reserva en esa mesa en ese horario
                    horarios.map((h) => {
                      // se crea el objeto reserva para enviar via post
                      let objReserva = {
                        cantidad: mesa_reserva.capacidad,
                        fecha: this.state.fecha,
                        horario: h.o,
                        restauranteId: restaurante.id,
                        clienteId: cliente.id,
                        mesaId: mesa_reserva.id,
                      };
                      console.log(objReserva);
                      axios
                        .post("http://localhost:9090/api/reservas", objReserva)
                        .then(function (response) {
                          alert("Se reservó correctamente!");
                          window.location = "/";
                        })
                        .catch(function (error) {
                          console.log(error);
                          alert("Error, intente de nuevo");
                        });
                    });
                  }
                }
              }}
              initialValues={{
                mesa: "",
                nombre: "",
                apellido: "",
                cedula: "",
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  {this.state.mostrar_form_reserva_con_cliente ? (
                    //muestra el campo readonly ya que hay cliente
                    <>
                      <Form.Row>
                        <Col sm={6} lg={6}>
                          <Form.Label>Reserva a nombre de</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={
                              cliente.nombre + " " + cliente.apellido
                            }
                            readOnly
                          />
                        </Col>
                        <Col sm={6} lg={6}>
                          <Form.Label>Fecha </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={this.state.fecha}
                            readOnly
                          />
                        </Col>
                      </Form.Row>
                    </>
                  ) : (
                    //muestra el campo para agregar cliente
                    <>
                      <Form.Row>
                        <Col lg={6}>
                          <Form.Label>Ingrese nombre del Cliente</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="ej: Bruno"
                            onChange={handleChange}
                            name="nombre"
                            value={values.nombre}
                          />
                        </Col>
                        <Col lg={6}>
                          <Form.Label>Ingrese Apellido del Cliente</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="ej: Ruiz Diaz"
                            onChange={handleChange}
                            name="apellido"
                            value={values.apellido}
                          />
                        </Col>
                      </Form.Row>
                      <Form.Row>
                        <Col sm={6} lg={6}>
                          <Form.Label>Ingrese la cédula del Usuario</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="ej:5409702"
                            onChange={handleChange}
                            name="cedula"
                            value={values.cedula}
                          />
                        </Col>
                      </Form.Row>
                      <br />
                      <Form.Row>
                        <Col sm={6} lg={6}>
                          <Form.Label>Fecha </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={this.state.fecha}
                            readOnly
                          />
                        </Col>
                        <Col sm={6} lg={6}>
                          <Form.Label>Seleccione la mesa</Form.Label>
                          <Form.Control
                            as="select"
                            name="mesa"
                            value={values.mesa}
                            onChange={handleChange}
                          >
                            <option value="" selected disabled hidden>
                              Elija número de mesa a reservar.
                            </option>
                            {mesas.map((m) => (
                              <option value={m.id}>{m.id}</option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Form.Row>
                    </>
                  )}

                  <br />
                  <Form.Row>
                    <Form.Label>Horarios</Form.Label>
                    <ul>
                      {horarios.map((h) => (
                        <li>{h.o}</li>
                      ))}
                    </ul>
                  </Form.Row>
                  <Form.Row className="right">
                    <Button type="submit" variant="outline-danger">
                      Reservar
                    </Button>
                  </Form.Row>
                </Form>
              )}
            </Formik>
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
