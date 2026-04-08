import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLock, FaEnvelope, FaArrowLeft, FaIdCard,
  FaGoogle, FaEye, FaEyeSlash, FaShieldAlt,
  FaStar, FaArrowRight
} from "react-icons/fa";
import Tesseract from "tesseract.js";
import "../styles/Login.css";
import bgImage from "../assets/logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: null, type: "idle" });
  const [attempts, setAttempts] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      if (value.length > 6) {
        setPasswordError("La contraseña solo puede tener hasta 6 dígitos.");
        return;
      } else {
        setPasswordError("");
      }
    }
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleAccess = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI || window.location.origin;
    const hostedDomain = process.env.REACT_APP_UNIVERSITY_DOMAIN || "urp.edu.pe";
    if (!clientId) {
      setStatus({ loading: false, error: "Falta configurar REACT_APP_GOOGLE_CLIENT_ID.", type: "error" });
      return;
    }
    const url =
      "https://accounts.google.com/o/oauth2/v2/auth" +
      `?client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      "&response_type=token&scope=openid%20email%20profile" +
      `&hd=${encodeURIComponent(hostedDomain)}&prompt=select_account`;
    window.location.href = url;
  };

  const parseHashParams = (hash) => {
    const raw = hash.startsWith("#") ? hash.slice(1) : hash;
    return new URLSearchParams(raw);
  };

  const executeAuth = useCallback(async (e) => {
    e.preventDefault();
    if (passwordError) return;
    if (attempts >= 3) {
      setStatus({ loading: false, error: "ACCESO BLOQUEADO: Use su carnet universitario.", type: "error" });
      return;
    }
    setStatus({ loading: true, error: null, type: "idle" });
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) {
        const n = attempts + 1;
        setAttempts(n);
        throw new Error(data.message || `Credenciales incorrectas. Intento ${n} de 3`);
      }
      localStorage.setItem("user_session", JSON.stringify(data));
      navigate("/admin/inicio");
    } catch (err) {
      setStatus({ loading: false, error: err.message, type: "error" });
    }
  }, [credentials, navigate, attempts, passwordError]);

  useEffect(() => {
    let stream = null;
    const vid = videoRef.current;
    if (isRecoveryMode) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then((s) => { stream = s; if (videoRef.current) videoRef.current.srcObject = s; })
        .catch(() => setStatus({ type: "error", error: "Error: No se detectó cámara activa." }));
    }
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (vid) vid.srcObject = null;
    };
  }, [isRecoveryMode]);

  useEffect(() => {
    const processGoogle = async () => {
      if (!window.location.hash.includes("access_token")) return;
      const domain = (process.env.REACT_APP_UNIVERSITY_DOMAIN || "urp.edu.pe").toLowerCase();
      const params = parseHashParams(window.location.hash);
      const token = params.get("access_token");
      if (!token) { setStatus({ loading: false, error: "No se pudo recuperar el token.", type: "error" }); return; }
      setStatus({ loading: true, error: "Validando cuenta institucional...", type: "processing" });
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Google no devolvió información del usuario.");
        const profile = await res.json();
        const email = (profile.email || "").toLowerCase();
        if (!profile.email_verified) throw new Error("Tu cuenta de Google no tiene correo verificado.");
        if (!email.endsWith(`@${domain}`)) throw new Error(`Solo se permiten correos @${domain}.`);
        localStorage.setItem("user_session", JSON.stringify({
          token, provider: "google",
          user: { nombres: profile.given_name || "Usuario", apellidos: profile.family_name || "", email: profile.email, rol: "admin", picture: profile.picture || "" },
        }));
        window.history.replaceState({}, document.title, window.location.pathname);
        navigate("/admin/inicio");
      } catch (err) {
        window.history.replaceState({}, document.title, window.location.pathname);
        setStatus({ loading: false, error: err.message || "Error en autenticación.", type: "error" });
      }
    };
    processGoogle();
  }, [navigate]);

  const handleScan = async () => {
    if (!videoRef.current) return;
    setScanning(true);
    setStatus({ type: "processing", error: "Validando carnet..." });
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 640, 480);
    const image = canvasRef.current.toDataURL("image/png");
    try {
      const { data: { text } } = await Tesseract.recognize(image, "spa");
      const upper = text.toUpperCase();
      if (text.match(/202[1-6]/) || upper.includes("RICARDO PALMA") || upper.includes("PALMA")) {
        setStatus({ type: "success", error: "IDENTIDAD CONFIRMADA" });
        setTimeout(() => navigate("/admin/inicio"), 1500);
      } else {
        setStatus({ type: "error", error: "RECHAZADA: Carnet no válido o anterior a 2021." });
      }
    } catch {
      setStatus({ type: "error", error: "ERROR DE LECTURA: Acerque más el carnet." });
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="auth-container">

      {/* ══ LEFT PANEL ══ */}
      <div className="auth-aside" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="auth-overlay">

          <div className="brand-identity">
            <span className="brand-dot" />
            <h2>D'BARÍ COMPANY</h2>
          </div>

          <div className="brand-center">
            <div className="brand-logo-card">
              <div className="logo-icon-wrap">
                <FaShieldAlt />
              </div>
              <h1>D'BARÍ</h1>
              <span className="brand-tag">Company</span>
            </div>

            <div className="auth-quote-pill">
              "Estandarizando la excelencia en melamina"
            </div>

            <div className="brand-features">
              <div className="feature-card">
                <div className="feature-icon"><FaShieldAlt /></div>
                <div>
                  <h4>Calidad Premium</h4>
                  <p>Materiales superiores</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaStar /></div>
                <div>
                  <h4>Diseños Exclusivos</h4>
                  <p>A tu medida</p>
                </div>
              </div>
            </div>
          </div>

          <div className="brand-bottom">© 2025 D'Barí Company · Todos los derechos reservados</div>
        </div>
      </div>

      {/* ══ RIGHT PANEL ══ */}
      <div className="auth-form-section">
        <div className="auth-card">

          {!isRecoveryMode ? (
            <>
              <header className="auth-header">
                <div className="auth-icon-3d"><FaLock /></div>
                <h1>Bienvenido</h1>
                <p>Portal Seguro de Empleados</p>
              </header>

              <form onSubmit={executeAuth}>
                {status.error && <div className="auth-error-msg">{status.error}</div>}

                <div className="field-group">
                  <label>Correo Institucional</label>
                  <div className="input-3d-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input
                      name="email" type="email"
                      placeholder="usuario@dbary.com"
                      onChange={handleInputChange} required
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label>Contraseña</label>
                  <div className={`input-3d-wrapper ${passwordError ? "input-error" : ""}`}>
                    <FaLock className="input-icon" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••"
                      onChange={handleInputChange}
                      value={credentials.password}
                      maxLength={7}
                      required
                    />
                    <button type="button" className="eye-toggle" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {passwordError && <div className="password-error-msg">⚠ {passwordError}</div>}

                  <div className="pwd-strength-dots">
                    {[...Array(6)].map((_, i) => (
                      <span key={i} className={`pwd-dot ${credentials.password.length > i ? "active" : ""}`} />
                    ))}
                  </div>
                </div>

                <div className="auth-options">
                  <span className="link-recovery" onClick={() => setIsRecoveryMode(true)} style={{ cursor: "pointer" }}>
                    ¿Olvidó su clave? Use su carnet <FaArrowRight style={{ fontSize: 12 }} />
                  </span>
                </div>

                <button
                  type="submit" className="auth-submit-btn"
                  disabled={status.loading || attempts >= 3 || !!passwordError}
                >
                  <span className="btn-content">
                    {status.loading ? "Verificando..." : attempts >= 3 ? "Bloqueado: Use Carnet" : <>Acceder <FaArrowRight /></>}
                  </span>
                </button>

                <button type="button" className="google-access-btn" onClick={handleGoogleAccess} disabled={status.loading}>
                  <FaGoogle style={{ color: "#db4437", fontSize: 20 }} />
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
                <p className={status.type} style={{ color: status.type === "error" ? "#ef4444" : "#1d4ed8", fontWeight: "bold" }}>
                  {status.error || "Coloque su carnet frente a la cámara"}
                </p>
              </header>

              <div className="scanner-viewport">
                <video ref={videoRef} autoPlay playsInline muted />
                <div className="scanner-overlay" />
              </div>

              <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480" />

              <button onClick={handleScan} className="auth-submit-btn" disabled={scanning}>
                <span className="btn-content">{scanning ? "Analizando..." : "Escanear y Validar"}</span>
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;