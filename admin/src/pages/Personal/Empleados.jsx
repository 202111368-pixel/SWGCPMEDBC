import React, { useState } from "react";
import "../../styles/pages/Empleados.css";

export default function Empleados() {
  const [empleado, setEmpleado] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    cargo: "",
    telefono: "",
  });

  const [lista, setLista] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const registrarEmpleado = () => {
    if (!empleado.nombre || !empleado.apellido) return;

    if (editIndex !== null) {
      const copia = [...lista];
      copia[editIndex] = empleado;
      setLista(copia);
      setEditIndex(null);
    } else {
      setLista([...lista, empleado]);
    }

    setEmpleado({
      nombre: "",
      apellido: "",
      dni: "",
      cargo: "",
      telefono: "",
    });
  };

  const editarEmpleado = (index) => {
    setEmpleado(lista[index]);
    setEditIndex(index);
  };

  const eliminarEmpleado = (index) => {
    const nuevaLista = lista.filter((_, i) => i !== index);
    setLista(nuevaLista);
  };

  return (
    <div className="page-container">
      <h2>Registro de Empleados</h2>

      <div className="form">
        <input name="nombre" placeholder="Nombre" value={empleado.nombre} onChange={handleChange} />
        <input name="apellido" placeholder="Apellido" value={empleado.apellido} onChange={handleChange} />
        <input name="dni" placeholder="DNI" value={empleado.dni} onChange={handleChange} />
        <input name="cargo" placeholder="Cargo" value={empleado.cargo} onChange={handleChange} />
        <input name="telefono" placeholder="Teléfono" value={empleado.telefono} onChange={handleChange} />

        <button className="btn" onClick={registrarEmpleado}>
          {editIndex !== null ? "Actualizar" : "Registrar"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Cargo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((emp, i) => (
            <tr key={i}>
              <td>{emp.nombre}</td>
              <td>{emp.apellido}</td>
              <td>{emp.dni}</td>
              <td>{emp.cargo}</td>
              <td>{emp.telefono}</td>
              <td>
                <button className="btn-edit" onClick={() => editarEmpleado(i)}>Editar</button>
                <button className="btn-delete" onClick={() => eliminarEmpleado(i)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}