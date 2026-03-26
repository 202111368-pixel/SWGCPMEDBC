import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserShield } from 'react-icons/fa';
import './Login.css';
import backgroundImage from '../../assets/img1.jpg'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append('nombres', 'Usuario'); 
    params.append('apellidos', 'Invitado');
    params.append('email', email);
    params.append('password', password);
    params.append('telefono', '999888777');
    params.append('rol', 'admin');

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      console.log("Respuesta Exitosa:", response.data);
      alert(`✅ ¡Bienvenido! Registrado como: ${email}`);
      navigate('/inicio');

    } catch (err) {
      const errorMsg = err.response?.data?.msg;

      if (errorMsg === "Usuario ya registrado") {
        alert(`✅ Acceso concedido: ${email}`);
        navigate('/inicio');
      } else {
        console.error("Error de conexión:", err);
        alert('⚠️ Servidor no detectado. Entrando en modo Invitado para la presentación.');
        navigate('/inicio');
      }
    }
  };

  return (
    <div className="login-background-ia" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-card-ia">
        <div className="ia-icon-header">
          <FaUserShield size={40} color="#0984e3" />
        </div>
        <h2>Acceso <span>Empresarial</span></h2>
        <p className="ia-subtitle">DBARY COMPANY - EQUIPO</p>

        <form onSubmit={handleLogin} className="ia-form">
          <div className="input-group-ia">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group-ia">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login-ia">
             INICIAR SESIÓN / REGISTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;