import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        alert("Correo o contraseña incorrectos");
        return;
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/admin");
    } catch (error) {
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="login-wrapper">

      <div className="login-left">
        <svg
          className="svg-figures"
          viewBox="0 0 900 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="fig fig-orange" transform="translate(40,260)">
            <path d="M0 140 Q150 -40 300 140 V240 H0 Z" fill="#FF7A2D" />
            <circle cx="100" cy="180" r="10" fill="#000" />
            <circle cx="160" cy="180" r="10" fill="#000" />
            <path d="M100 210 Q130 230 160 210" stroke="#000" strokeWidth="8" strokeLinecap="round" fill="none" />
          </g>

          <g className="fig fig-purple" transform="translate(200,60) rotate(-5)">
            <path d="M0 0 H180 L150 380 H0 Z" fill="#7833F0" />
            <circle cx="70" cy="140" r="10" fill="#000" />
            <circle cx="110" cy="140" r="10" fill="#000" />
            <path d="M75 170 Q95 185 115 170" stroke="#000" strokeWidth="8" strokeLinecap="round" fill="none" />
          </g>

          <g className="fig fig-black" transform="translate(400,120)">
            <rect x="0" y="0" width="160" height="330" rx="40" fill="#000" />
            <circle cx="55" cy="120" r="12" fill="#fff" />
            <circle cx="105" cy="120" r="12" fill="#fff" />
            <path d="M60 160 Q80 180 100 160" stroke="#fff" strokeWidth="8" strokeLinecap="round" fill="none" />
          </g>

          <g className="fig fig-yellow" transform="translate(560,160) rotate(-6)">
            <path d="M0 0 Q110 -40 220 0 V260 H0 Z" fill="#FFD024" />
            <circle cx="70" cy="110" r="10" fill="#000" />
            <circle cx="110" cy="110" r="10" fill="#000" />
            <path d="M75 140 Q105 170 135 140" stroke="#000" strokeWidth="10" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h1>Welcome!</h1>
          <p className="subtitle">Inicia sesión con tu cuenta</p>

          <form onSubmit={handleSubmit}>
            <label>Correo</label>
            <input
              type="email"
              placeholder="Correo institucional"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn-login">
              Iniciar sesión
            </button>
          </form>

          <div className="divider">o</div>

          <button
            className="btn-google"
            onClick={() =>
              (window.location.href = "http://localhost:5000/api/auth/google")
            }
          >
            Iniciar con Google
          </button>

          <p className="footer-text">¿No tienes cuenta? Regístrate</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
