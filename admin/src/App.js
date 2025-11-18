import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './styles/Sidebar.css';
import './styles/Login.css'; 
import Login from "./pages/Login";

// Almacén
import Categoria from './pages/Almacen/Categoria';
import Marca from './pages/Almacen/Marca';
import Producto from './pages/Almacen/Producto';

// Cotizaciones
import GenerarCotizacion from './pages/Cotizaciones/GenerarCotizacion';
import VerCotizacion from './pages/Cotizaciones/VerCotizacion';

// Compras
import Proveedores from './pages/Compras/Proveedores';
import RealizarCompra from './pages/Compras/RealizarCompra';

// Caja
import AdministrarCaja from './pages/Caja/AdministrarCaja';
import HistorialCaja from './pages/Caja/HistorialCaja';

// Configuración
import Configuracion from './pages/Configuracion/Configuracion';

// Inventario
import NuevoInventario from './pages/Inventario/NuevoInventario';

// Ventas
import Clientes from './pages/Ventas/Clientes';
import RealizarVenta from './pages/Ventas/RealizarVenta';
import VentasDia from './pages/Ventas/VentasDia';
import VentasFecha from './pages/Ventas/VentasFecha';
import VentasMes from './pages/Ventas/VentasMes';

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
                  {/* Almacén */}
                  <Route path="almacen/categoria" element={<Categoria />} />
                  <Route path="almacen/marca" element={<Marca />} />
                  <Route path="almacen/producto" element={<Producto />} />

                  {/* Cotizaciones */}
                  <Route path="cotizaciones/generar" element={<GenerarCotizacion />} />
                  <Route path="cotizaciones/ver" element={<VerCotizacion />} />

                  {/* Compras */}
                  <Route path="compras/proveedores" element={<Proveedores />} />
                  <Route path="compras/realizar" element={<RealizarCompra />} />

                  {/* Caja */}
                  <Route path="caja/administrar" element={<AdministrarCaja />} />
                  <Route path="caja/historial" element={<HistorialCaja />} />

                  {/* Configuración */}
                  <Route path="configuracion" element={<Configuracion />} />

                  {/* Inventario */}
                  <Route path="inventario/nuevo" element={<NuevoInventario />} />

                  {/* Ventas */}
                  <Route path="ventas/clientes" element={<Clientes />} />
                  <Route path="ventas/realizar" element={<RealizarVenta />} />
                  <Route path="ventas/dia" element={<VentasDia />} />
                  <Route path="ventas/fecha" element={<VentasFecha />} />
                  <Route path="ventas/mes" element={<VentasMes />} />
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
