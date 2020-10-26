import React from "react";
import axios from "axios";
import { Formik } from "formik";
import { Container, Col, Row, Form, Button, Table } from "react-bootstrap";
import "../styles/profileproveedor-style.css";

const ListaMesas = ({ cliente, mesas, fecha, hora }) => (
  <>
    <h2>Listado de mesas disponibles</h2>
    <Table striped bordered hover size="sm" variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Piso</th>
          <th>Capacidad</th>
        </tr>
      </thead>
      <tbody>
        {mesas.map((m) => (
          <tr>
            <td>{m.id}</td>
            <td>{m.nombre}</td>
            <td>{m.piso}</td>
            <td>{m.capacidad}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
);

export default ListaMesas;
