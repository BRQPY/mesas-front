import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { Container, Col, Row, Form, Button, Table } from "react-bootstrap";
class FormReserva extends React.Component {
    render(){
        const { mesa_reserva } = this.props.mesa;
        return(
            <>
            <h2>Formulario de Reserva</h2>
            <Formik
              onSubmit={(values) => {
               
                // get mesa seleccionada
                axios
                  .get(`http://localhost:9090/api/mesas/${values.mesa}`)
                  .then((response) => {
                    this.setState({
                      mesa_reserva: response.data,
                    });
                  });
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
              }}
              initialValues={{
                mesa: "",
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <Col sm={6} lg={6}>
                      <Form.Label>Introduzca cédula para buscar al usuario</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="5409702"
                      />
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col sm={6} lg={6}>
                      <Form.Label>Reserva a nombre de</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={this.props.cliente.nombre + " " + this.props.cliente.apellido}
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
                  <br />
                  <Form.Row>
                    <Col sm={6} lg={6}>
                      <Form.Label>Horarios</Form.Label>
                      <ul>
                        {this.state.horas.map((h) => (
                          <li inline>{h.o}</li>
                        ))}
                      </ul>
                    </Col>
                    <Col sm={6} lg={6}>
                      <Form.Label>Seleccione la mesa</Form.Label>
                      <Form.Control
                        size="sm"
                        as="select"
                        name="mesa"
                        value={values.mesa}
                        onChange={handleChange}
                      >
                        <option value="" selected disabled hidden>
                          Elija número de mesa a reservar.
                        </option>
                        {this.state.mesas.map((m) => (
                          <option value={m.id}>{m.id}</option>
                        ))}
                      </Form.Control>
                    </Col>
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
        )
    }
}
export default FormReserva;