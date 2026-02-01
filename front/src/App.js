import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Inicio from './pages/Inicio/Inicio';
import Producto from './pages/Producto/Producto';
import Nosotros from './pages/Nosotros/Nosotros';
import Contacto from './pages/Contacto/Contacto';
import Denuncia from './pages/Denuncia/Denuncia';
import Carrito from "./pages/Carrito/Carrito";

// detalles de productos
import CocinaDetalle from "./detallesProducto/CocinaDetalle";
import MueblesDetalle from "./detallesProducto/MueblesDetalle";
import PlacardsDetalle from "./detallesProducto/PlacardsDetalle";
import TallerDetalle from "./detallesProducto/TallerDetalle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Páginas principales */}
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/denuncia" element={<Denuncia />} />

        {/*  Carrito */}
        <Route path="/carrito" element={<Carrito />} />

        {/* Detalles de productos */}
        <Route path="/detalles/cocina" element={<CocinaDetalle />} />
        <Route path="/detalles/muebles" element={<MueblesDetalle />} />
        <Route path="/detalles/placards" element={<PlacardsDetalle />} />
        <Route path="/detalles/taller" element={<TallerDetalle />} />

        {/* Ruta no encontrada */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
