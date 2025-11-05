import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../assets/logo.jpg'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </div>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/productos">Productos</Link></li>
         <li><Link to="/invetario">Invetario</Link></li>
        <li><Link to="/configuracion">Configuracion</Link></li>

      </ul>
    </div>
  );
};

export default Sidebar;
