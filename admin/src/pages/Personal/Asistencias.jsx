import React, { useState } from "react";
import "../../styles/pages/Asistencias.css";

export default function Asistencias() {
  const [asistencia, setAsistencia] = useState({
    empleado: "",
    fecha: "",
    entrada: "",
    salida: "",
    estado: "Presente",
  });

  const [lista, setLista] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setAsistencia({ ...asistencia, [e.target.name]: e.target.value });
  };

  const registrarAsistencia = () => {
    if (!asistencia.empleado || !asistencia.fecha) return;

    if (editIndex !== null) {
      const copia = [...lista];
      copia[editIndex] = asistencia;
      setLista(copia);
      setEditIndex(null);
    } else {
      setLista([...lista, asistencia]);
    }

    setAsistencia({
      empleado: "",
      fecha: "",
      entrada: "",
      salida: "",
      estado: "Presente",
    });
  };

  const editarAsistencia = (index) => {
    setAsistencia(lista[index]);
    setEditIndex(index);
  };

  const eliminarAsistencia = (index) => {
    const nuevaLista = lista.filter((_, i) => i !== index);
    setLista(nuevaLista);
  };

  return (
    <div className="page-container">
      <h2>Control de Asistencias</h2>

      <div className="form">
        <input name="empleado" placeholder="Nombre Empleado" value={asistencia.empleado} onChange={handleChange} />
        <input type="date" name="fecha" value={asistencia.fecha} onChange={handleChange} />
        <input type="time" name="entrada" value={asistencia.entrada} onChange={handleChange} />
        <input type="time" name="salida" value={asistencia.salida} onChange={handleChange} />

        <select name="estado" value={asistencia.estado} onChange={handleChange}>
          <option>Presente</option>
          <option>Tarde</option>
          <option>Falta</option>
        </select>

        <button className="btn" onClick={registrarAsistencia}>
          {editIndex !== null ? "Actualizar" : "Registrar"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Fecha</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((asis, i) => (
            <tr key={i}>
              <td>{asis.empleado}</td>
              <td>{asis.fecha}</td>
              <td>{asis.entrada}</td>
              <td>{asis.salida}</td>
              <td>{asis.estado}</td>
              <td>
                <button className="btn-edit" onClick={() => editarAsistencia(i)}>Editar</button>
                <button className="btn-delete" onClick={() => eliminarAsistencia(i)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}