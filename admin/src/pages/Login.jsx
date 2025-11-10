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
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo institucional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>

        <div className="divider">o</div>

        <button
          className="google-btn"
          onClick={() =>
            (window.location.href = "http://localhost:5000/api/auth/google")
          }
        >
          Iniciar con Google
        </button>
      </div>
    </div>
  );
};

export default Login;
