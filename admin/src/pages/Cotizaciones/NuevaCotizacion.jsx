import React, { useState } from "react";
import "../../styles/pages/Cotizaciones.css";

const NuevaCotizacion = () => {
  const [form, setForm] = useState({
    cliente: "",
    ruc: "",
    proyecto: "",
    fecha: "",
    validez: "15 días",
    moneda: "PEN",
    subtotal: "",
    descuento: "",
    impuestos: "",
    notas: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const subtotal = Number(form.subtotal) || 0;
  const descuento = Number(form.descuento) || 0;
  const impuestos = Number(form.impuestos) || 0;
  const totalCalculado = subtotal - descuento + impuestos;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.cliente || !form.proyecto || !form.fecha) {
      alert("Completa al menos cliente, proyecto y fecha.");
      return;
    }

    const nuevaCotizacion = {
      id: Date.now(),
      ...form,
      total: totalCalculado,
      fechaRegistro: new Date().toISOString(),
    };

    const almacenadas =
      JSON.parse(localStorage.getItem("cotizaciones") || "[]");
    const actualizadas = [...almacenadas, nuevaCotizacion];
    localStorage.setItem("cotizaciones", JSON.stringify(actualizadas));

    const movimientos =
      JSON.parse(localStorage.getItem("cotizacionesMovimientos") || "[]");
    movimientos.push({
      id: Date.now(),
      tipo: "CREACIÓN",
      mensaje: `Se creó la cotización para ${form.cliente} - ${form.proyecto}`,
      fecha: new Date().toISOString(),
    });
    localStorage.setItem(
      "cotizacionesMovimientos",
      JSON.stringify(movimientos)
    );

    alert("Cotización guardada (demo, solo en localStorage).");

    setForm({
      cliente: "",
      ruc: "",
      proyecto: "",
      fecha: "",
      validez: "15 días",
      moneda: "PEN",
      subtotal: "",
      descuento: "",
      impuestos: "",
      notas: "",
    });
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Nueva Cotización</h2>
      <p className="page-description">
        Genera una cotización de muebles y proyectos en melamina para clientes.
        Al guardar, la cotización se registrará en el historial.
      </p>

      <div className="cotizacion-layout">
        <div className="card">
          <h3>Datos de la cotización</h3>

          <form onSubmit={handleSubmit} className="cotizacion-form">
            <div className="form-group">
              <label>Cliente</label>
              <input
                type="text"
                name="cliente"
                value={form.cliente}
                onChange={handleChange}
                placeholder="Ej. Constructora Los Olivos SAC"
              />
            </div>

            <div className="form-group">
              <label>RUC / DNI</label>
              <input
                type="text"
                name="ruc"
                value={form.ruc}
                onChange={handleChange}
                placeholder="Ej. 20123456789"
              />
            </div>

            <div className="form-group">
              <label>Proyecto</label>
              <input
                type="text"
                name="proyecto"
                value={form.proyecto}
                onChange={handleChange}
                placeholder="Ej. Mobiliario de oficina en melamina 18mm"
              />
            </div>

            <div className="form-group">
              <label>Fecha de emisión</label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Validez de la oferta</label>
              <select
                name="validez"
                value={form.validez}
                onChange={handleChange}
              >
                <option value="7 días">7 días</option>
                <option value="15 días">15 días</option>
                <option value="30 días">30 días</option>
              </select>
            </div>

            <div className="form-group">
              <label>Moneda</label>
              <select
                name="moneda"
                value={form.moneda}
                onChange={handleChange}
              >
                <option value="PEN">S/ (PEN)</option>
                <option value="USD">$ (USD)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Subtotal</label>
              <input
                type="number"
                name="subtotal"
                value={form.subtotal}
                onChange={handleChange}
                placeholder="Ej. 4500.00"
              />
            </div>

            <div className="form-group">
              <label>Descuento</label>
              <input
                type="number"
                name="descuento"
                value={form.descuento}
                onChange={handleChange}
                placeholder="Ej. 300.00"
              />
            </div>

            <div className="form-group">
              <label>Impuestos</label>
              <input
                type="number"
                name="impuestos"
                value={form.impuestos}
                onChange={handleChange}
                placeholder="Ej. 810.00 (IGV, etc.)"
              />
            </div>

            <div className="form-group form-group-full">
              <label>Notas / Condiciones</label>
              <textarea
                name="notas"
                value={form.notas}
                onChange={handleChange}
                placeholder="Ej. Precios incluyen instalación, garantía de 1 año, no incluye trabajos eléctricos."
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Guardar cotización
              </button>
            </div>
          </form>
        </div>

        <div className="card cotizacion-preview">
          <h3>Resumen previo</h3>

          <div className="preview-section">
            <h4>Cliente</h4>
            <p>
              <strong>{form.cliente || "Cliente no definido"}</strong>
              <br />
              {form.ruc && <span>RUC / DNI: {form.ruc}</span>}
            </p>
          </div>

          <div className="preview-section">
            <h4>Proyecto</h4>
            <p>{form.proyecto || "Describe brevemente el proyecto."}</p>
          </div>

          <div className="preview-grid">
            <div>
              <span className="preview-label">Fecha</span>
              <p>{form.fecha || "-"}</p>
            </div>
            <div>
              <span className="preview-label">Validez</span>
              <p>{form.validez}</p>
            </div>
            <div>
              <span className="preview-label">Moneda</span>
              <p>{form.moneda}</p>
            </div>
          </div>

          <div className="preview-totales">
            <div className="preview-row">
              <span>Subtotal</span>
              <span>
                {subtotal.toLocaleString("es-PE", {
                  style: "currency",
                  currency: form.moneda === "USD" ? "USD" : "PEN",
                })}
              </span>
            </div>
            <div className="preview-row">
              <span>Descuento</span>
              <span>
                {descuento.toLocaleString("es-PE", {
                  style: "currency",
                  currency: form.moneda === "USD" ? "USD" : "PEN",
                })}
              </span>
            </div>
            <div className="preview-row">
              <span>Impuestos</span>
              <span>
                {impuestos.toLocaleString("es-PE", {
                  style: "currency",
                  currency: form.moneda === "USD" ? "USD" : "PEN",
                })}
              </span>
            </div>
            <div className="preview-row preview-total">
              <span>Total estimado</span>
              <span>
                {totalCalculado.toLocaleString("es-PE", {
                  style: "currency",
                  currency: form.moneda === "USD" ? "USD" : "PEN",
                })}
              </span>
            </div>
          </div>

          <div className="preview-section">
            <h4>Notas</h4>
            <p>{form.notas || "Aquí se mostrarán las condiciones de la cotización."}</p>
          </div>

          <p className="preview-hint">
            🔁 Al guardar, podrás ver esta cotización en el{" "}
            <strong>Historial de Cotizaciones</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NuevaCotizacion;
