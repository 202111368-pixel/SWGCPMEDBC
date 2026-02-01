import React, { useState, useMemo, useEffect } from "react";
import "../../styles/pages/Compras.css";

const OrdenesCompra = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarDrawer, setMostrarDrawer] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [archivoNombre, setArchivoNombre] = useState("");

  const [form, setForm] = useState({
    numeroOrden: "",
    proveedor: "",
    fecha: "",
    estado: "Borrador",
    tipoCompra: "Melamina",
    montoEstimado: "",
    notas: "",
    adjuntoNombre: "",
  });

  const [items, setItems] = useState([]);
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [itemTemp, setItemTemp] = useState({
    cantidad: "",
    itemProveedor: "",
    descripcion: "",
    costoUnitario: "",
    importe: "0.00",
    notas: "",
  });

  /* =====================================================
     IMPORTAR COMPRAS DESDE EL CARRITO
  ===================================================== */
 useEffect(() => {
  const data = JSON.parse(localStorage.getItem("ordenesCompra")) || [];
  setOrdenes(data);
}, []);


  /* =====================================================
     FUNCIONES
  ===================================================== */
  const resetForm = () => {
    setForm({
      numeroOrden: "",
      proveedor: "",
      fecha: "",
      estado: "Borrador",
      tipoCompra: "Melamina",
      montoEstimado: "",
      notas: "",
      adjuntoNombre: "",
    });
    setArchivoNombre("");
    setItems([]);
    setEditingId(null);
    setEditingItemIndex(null);
    setItemTemp({
      cantidad: "",
      itemProveedor: "",
      descripcion: "",
      costoUnitario: "",
      importe: "0.00",
      notas: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemTempChange = (e) => {
    const { name, value } = e.target;
    let next = { ...itemTemp, [name]: value };

    const cantidadNum = Number(next.cantidad) || 0;
    const costoNum = Number(next.costoUnitario) || 0;
    next.importe = (cantidadNum * costoNum).toFixed(2);

    setItemTemp(next);
  };

  const addOrUpdateItem = (e) => {
    e.preventDefault();

    if (!itemTemp.cantidad || !itemTemp.descripcion) {
      alert("Completa cantidad y descripción");
      return;
    }

    if (editingItemIndex === null) {
      setItems((prev) => [...prev, { ...itemTemp, id: Date.now() }]);
    } else {
      setItems((prev) =>
        prev.map((it, idx) =>
          idx === editingItemIndex ? { ...itemTemp, id: it.id } : it
        )
      );
    }

    setItemTemp({
      cantidad: "",
      itemProveedor: "",
      descripcion: "",
      costoUnitario: "",
      importe: "0.00",
      notas: "",
    });
    setEditingItemIndex(null);
  };

  const calculateTotalItems = (list) =>
    list.reduce((acc, it) => acc + Number(it.importe || 0), 0);

  const handleSubmitOrden = (e) => {
    e.preventDefault();

    if (!form.numeroOrden || !form.proveedor || !form.fecha) {
      alert("Completa los campos obligatorios");
      return;
    }

    const ordenData = {
      id: editingId || Date.now(),
      ...form,
      montoEstimado:
        form.montoEstimado || calculateTotalItems(items),
      items,
      creadoEn: new Date().toISOString(),
    };

    if (editingId) {
      setOrdenes((prev) =>
        prev.map((o) => (o.id === editingId ? ordenData : o))
      );
    } else {
      setOrdenes((prev) => [...prev, ordenData]);
    }

    setMostrarDrawer(false);
    resetForm();
  };

  const ordenesFiltradas = useMemo(() => {
    const q = busqueda.toLowerCase();
    return ordenes.filter(
      (o) =>
        o.numeroOrden.toLowerCase().includes(q) ||
        o.proveedor.toLowerCase().includes(q)
    );
  }, [ordenes, busqueda]);

  /* =====================================================
     RENDER
  ===================================================== */
  return (
    <div className="page-container">
      <h2>Órdenes de Compra</h2>

      <input
        className="input-busqueda"
        placeholder="Buscar orden o proveedor"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <button className="btn btn-primary" onClick={() => setMostrarDrawer(true)}>
        Nueva orden +
      </button>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>N° Orden</th>
            <th>Proveedor</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {ordenesFiltradas.map((o, i) => (
            <tr key={o.id}>
              <td>{i + 1}</td>
              <td>{o.numeroOrden}</td>
              <td>{o.proveedor}</td>
              <td>{o.fecha}</td>
              <td>S/ {Number(o.montoEstimado).toFixed(2)}</td>
              <td>{o.items.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {mostrarDrawer && (
        <form onSubmit={handleSubmitOrden} className="drawer">
          <input
            name="numeroOrden"
            placeholder="N° Orden"
            value={form.numeroOrden}
            onChange={handleFormChange}
          />
          <input
            name="proveedor"
            placeholder="Proveedor"
            value={form.proveedor}
            onChange={handleFormChange}
          />
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleFormChange}
          />

          <button className="btn btn-success" type="submit">
            Guardar
          </button>
        </form>
      )}
    </div>
  );
};

export default OrdenesCompra;
