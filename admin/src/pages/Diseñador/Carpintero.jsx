import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaFilePdf, FaBoxOpen, FaTruckLoading } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import "../../styles/pages/Diseñador/Carpintero.css";

const Carpintero = () => {

  return (
    <div className="carpintero-container">
      <h2>Módulo de Carpintero</h2>
      <p>Bienvenido al área de producción y taller.</p>
    </div>
  );
};
export default Carpintero;