import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import bgImage from "../assets/logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: null });
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const executeAuth = useCallback(async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null });

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest" 
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Credenciales inválidas");
      }

      sessionStorage.setItem("token", data.token); 
      localStorage.setItem("user_session", JSON.stringify({
        id: data.id,
        role: data.role,
        name: data.name
      }));

      navigate("/admin/inicio");
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    }
  }, [credentials, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-aside" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="auth-overlay">
          <div className="brand-identity">
            <span className="brand-dot"></span>
            <h2>D’BARY COMPANY</h2>
          </div>
          <div className="auth-footer-content">
            <p className="auth-quote">"Estandarizando la excelencia en melamina."</p>
            <span className="auth-version">Control de Acceso v1.0.4</span>
          </div>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-card">
          <header>
            <h1>Bienvenido</h1>
            <p>Ingrese sus credenciales para continuar</p>
          </header>

          <form onSubmit={executeAuth} noValidate>
            {status.error && <div className="auth-error-msg">{status.error}</div>}
            
            <div className="field-group">
              <label htmlFor="email">Correo Institucional</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={credentials.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="auth-options">
              <Link to="/recovery" className="link-recovery">¿Olvidó su clave?</Link>
              <div className="toggle-session">
                <span className="label-text">Recordar</span>
                <label className="switch-ui">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={() => setRememberMe(!rememberMe)} 
                  />
                  <span className="slider-ui round"></span>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="auth-submit-btn" 
              disabled={status.loading}
            >
              {status.loading ? "Procesando..." : "Acceder al Sistema"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;