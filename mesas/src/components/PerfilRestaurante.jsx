import React from "react";
import axios from "axios";
import { Formik } from "formik";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import "../styles/profileproveedor-style.css";
import Mesas from "./Mesas"

class PerfilRestaurante extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurante: [],
      mesas: [],
      mostrar_tabla: false,
    };
  }

  render() {
    const { restaurante } = this.state;
    const { mesas } = this.state;
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
            values.opciones.map((o) =>
              axios
                .get(
                  `http://localhost:9090/api/mesas/disponibles?restauranteId=${restaurante.id}&fecha=${values.fecha}&horario=${o}`
                )
                .then((response) => {
                  this.setState({
                    mesas: response.data,
                    mostrar_form_reporte: !this.state.mostrar_form_reporte,
                  });
                })

                .catch(function (error) {
                  console.log(error);
                })
            );
          }}
          initialValues={{
            opciones: [],
            fecha: "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Container xs={4} md={4}>
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
              </Container>

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
        {this.state.mostrar_tabla ? (
          <Mesas {...this.state.mesas} />
        ) : null}
      </Container>
    );
  }
  componentDidMount() {
    //Restaurante desde el backend
    axios.get("http://localhost:9090/api/restaurantes/1").then((response) => {
      this.setState({
        restaurante: response.data,
      });
    });
  }
}

export default PerfilRestaurante;
