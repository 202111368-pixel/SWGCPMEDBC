import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Producto.css';

const Producto = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Productos</h1>
        <p>Aquí puedes ver y gestionar todos los productos disponibles.</p>
      </div>
    </>
  );
};

export default Producto;
