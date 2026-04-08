import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaEnvelope, FaLock, FaArrowLeft, FaIdCard, FaGoogle } from "react-icons/fa";
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

  const handleGoogleAccess = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI || window.location.origin;
    const hostedDomain = process.env.REACT_APP_UNIVERSITY_DOMAIN || "urp.edu.pe";

    if (!clientId) {
      setStatus({
        loading: false,
        error: "Falta configurar REACT_APP_GOOGLE_CLIENT_ID para acceso con Google institucional.",
        type: "error",
      });
      return;
    }

    const googleOauthUrl =
      "https://accounts.google.com/o/oauth2/v2/auth" +
      `?client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      "&response_type=token" +
      "&scope=openid%20email%20profile" +
      `&hd=${encodeURIComponent(hostedDomain)}` +
      "&prompt=select_account";

    window.location.href = googleOauthUrl;
  };

  const parseHashParams = (hashString) => {
    const rawHash = hashString.startsWith("#") ? hashString.slice(1) : hashString;
    return new URLSearchParams(rawHash);
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

  useEffect(() => {
    const processGoogleCallback = async () => {
      if (!window.location.hash.includes("access_token")) return;

      const hostedDomain = (process.env.REACT_APP_UNIVERSITY_DOMAIN || "urp.edu.pe").toLowerCase();
      const params = parseHashParams(window.location.hash);
      const accessToken = params.get("access_token");

      if (!accessToken) {
        setStatus({ loading: false, error: "No se pudo recuperar el token de Google.", type: "error" });
        return;
      }

      setStatus({ loading: true, error: "Validando cuenta institucional...", type: "processing" });

      try {
        const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) {
          throw new Error("Google no devolvió información del usuario.");
        }

        const profile = await response.json();
        const email = (profile.email || "").toLowerCase();

        if (!profile.email_verified) {
          throw new Error("Tu cuenta de Google no tiene correo verificado.");
        }

        if (!email.endsWith(`@${hostedDomain}`)) {
          throw new Error(`Solo se permiten correos institucionales @${hostedDomain}.`);
        }

        const googleSession = {
          token: accessToken,
          provider: "google",
          user: {
            nombres: profile.given_name || "Usuario",
            apellidos: profile.family_name || "",
            email: profile.email,
            rol: "admin",
            picture: profile.picture || "",
          },
        };

        localStorage.setItem("user_session", JSON.stringify(googleSession));
        window.history.replaceState({}, document.title, window.location.pathname);
        navigate("/admin/inicio");
      } catch (error) {
        window.history.replaceState({}, document.title, window.location.pathname);
        setStatus({ loading: false, error: error.message || "Error en autenticación con Google.", type: "error" });
      }
    };

    processGoogleCallback();
  }, [navigate]);

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

                <button type="button" className="google-access-btn" onClick={handleGoogleAccess} disabled={status.loading}>
                  <FaGoogle />
                  <span>{status.loading ? "Procesando acceso..." : "Acceder con Google"}</span>
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

//npm install axios
//el scaner ejecutar con eso npm install tesseract.js
//para escanear con tu carnet