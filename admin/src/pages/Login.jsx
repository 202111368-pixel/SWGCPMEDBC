import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaEnvelope, FaLock, FaArrowLeft, FaIdCard } from "react-icons/fa";
import Tesseract from "tesseract.js";
import "../styles/Login.css";
import bgImage from "../assets/logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: null, type: 'idle' });
  const [attempts, setAttempts] = useState(0);
  const [scanning, setScanning] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const executeAuth = useCallback(async (e) => {
    e.preventDefault();
    
    if (attempts >= 3) {
      setStatus({ loading: false, error: "ACCESO BLOQUEADO: Use su carnet universitario.", type: 'error' });
      return;
    }

    setStatus({ loading: true, error: null, type: 'idle' });
    
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      
      if (!response.ok) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        throw new Error(data.message || `Credenciales incorrectas. Intento ${newAttempts} de 3`);
      }
      
      localStorage.setItem("user_session", JSON.stringify(data));
      navigate("/admin/inicio");
    } catch (err) {
      setStatus({ loading: false, error: err.message, type: 'error' });
    }
  }, [credentials, navigate, attempts]);

  useEffect(() => {
    let streamInstance = null;
    const currentVideo = videoRef.current;

    if (isRecoveryMode) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
          streamInstance = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => setStatus({ type: 'error', error: "Error: No se detectó cámara activa." }));
    }

    return () => {
      if (streamInstance) {
        streamInstance.getTracks().forEach(track => track.stop());
      }
      if (currentVideo) {
        currentVideo.srcObject = null;
      }
    };
  }, [isRecoveryMode]);

  const handleScan = async () => {
    if (!videoRef.current) return;
    
    setScanning(true);
    setStatus({ type: 'processing', error: "Validando carnet..." });

    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const image = canvasRef.current.toDataURL("image/png");

    try {
      const { data: { text } } = await Tesseract.recognize(image, 'spa');
      const detectedText = text.toUpperCase();

      const hasYear = text.match(/202[1-6]/); 
      const isRicardoPalma = detectedText.includes("RICARDO PALMA") || detectedText.includes("PALMA");

      if (hasYear || isRicardoPalma) {
        setStatus({ type: 'success', error: "IDENTIDAD CONFIRMADA" });
        setTimeout(() => {
            navigate("/admin/inicio"); 
        }, 1500);
      } else {
        setStatus({ type: 'error', error: "RECHAZADA: Carnet no válido o anterior a 2021." });
      }
    } catch (err) {
      setStatus({ type: 'error', error: "ERROR DE LECTURA: Acerque más el carnet." });
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-aside" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="auth-overlay">
          <div className="brand-identity">
            <span className="brand-dot"></span>
            <h2>D’BARY COMPANY</h2>
          </div>
          <p className="auth-quote">"Estandarizando la excelencia en melamina."</p>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-card 3d-box">
          {!isRecoveryMode ? (
            <>
              <header className="auth-header">
                <div className="auth-icon-3d"><FaUserShield /></div>
                <h1>Bienvenido</h1>
                <p>Portal Seguro de Empleados</p>
              </header>
              <form onSubmit={executeAuth}>
                {status.error && <div className="auth-error-msg">{status.error}</div>}
                
                <div className="field-group">
                  <label>Correo Institucional</label>
                  <div className="input-3d-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input name="email" type="email" placeholder="usuario@dbary.com" onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="field-group">
                  <label>Contraseña</label>
                  <div className="input-3d-wrapper">
                    <FaLock className="input-icon" />
                    <input name="password" type="password" placeholder="••••••••" onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="auth-options">
                  <span className="link-recovery" onClick={() => setIsRecoveryMode(true)} style={{cursor:'pointer'}}>
                    ¿Olvidó su clave? Use su carnet
                  </span>
                </div>

                <button type="submit" className="auth-submit-btn 3d-button" disabled={status.loading || attempts >= 3}>
                  <span className="btn-content">
                    {status.loading ? "Verificando..." : attempts >= 3 ? "Bloqueado: Use Carnet" : "Acceder"}
                  </span>
                </button>
              </form>
            </>
          ) : (
            <>
              <header className="auth-header">
                <button onClick={() => setIsRecoveryMode(false)} className="back-btn"><FaArrowLeft /></button>
                <div className="auth-icon-3d"><FaIdCard /></div>
                <h1>Validación URP</h1>
                <p className={status.type} style={{color: status.type === 'error' ? '#ef4444' : '#6366f1', fontWeight: 'bold'}}>
                    {status.error || "Coloque su carnet frente a la cámara"}
                </p>
              </header>

              <div className="scanner-viewport">
                <video ref={videoRef} autoPlay playsInline muted />
                <div className="scanner-overlay"></div>
              </div>

              <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />

              <button onClick={handleScan} className="auth-submit-btn 3d-button" disabled={scanning}>
                <span className="btn-content">
                    {scanning ? "Analizando..." : "Escanear y Validar"}
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;


//el scaner ejecutar con eso npm install tesseract.js
//para escanear con tu carnet