import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaFilePdf, FaBoxOpen, FaTruckLoading } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import "../../styles/pages/Diseñador/Arquitecto.css";

const Arquitecto = () => {

  return (
    <div className="arquitecto-container">
      <h2>Módulo de Arquitecto</h2>
      <p>Bienvenido al área de diseño y planos.</p>
    </div>
  );
};

export default Arquitecto;