import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./styles/Sidebar.css";
import "./styles/Login.css";

/* Almacen */ 
import Categoria from "./pages/Almacen/Categoria"; 

/* Producto */ 
import Producto from "./pages/Producto/Producto";

/* Clientes  */
import Cliente from "./pages/Cliente/Cliente"; 

/* Login */
import Login from "./pages/Login";

/*  ventas */
import RegistrarVenta from "./pages/Ventas/RegistrarVenta";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin/*"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="content">
                <Routes>
                  {/* VENTAS */}
                  <Route path="ventas/registrar" element={<RegistrarVenta />} />

                  {/* ALMACÉN */}
                  <Route path="categoria" element={<Categoria />} />
                  <Route path="producto" element={<Producto />} />

                  {/* CLIENTES */}
                  <Route path="clientes" element={<Cliente />} />

                  <Route path="*" element={<div>Página no encontrada en Admin</div>} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;