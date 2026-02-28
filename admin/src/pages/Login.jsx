import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import bgImage from "../assets/logo.jpg"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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
      <div 
        className="login-left" 
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="overlay-content">
          <div className="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="6" r="4" />
              <circle cx="18" cy="6" r="4" />
              <circle cx="6" cy="18" r="4" />
              <circle cx="18" cy="18" r="4" />
            </svg>
            <h2>Nucleus</h2>
          </div>
          
          <div className="quote-container">
            <h3>"Simply all the tools that my team and I need."</h3>
            <p className="author">Karen Yue</p>
            <p className="role">Director of Digital Marketing Technology</p>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h1>Welcome</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-actions">
              <a href="#forgot" className="forgot-password">Forgot password?</a>
              
              <div className="remember-me">
                <span>Remember sign in details</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={() => setRememberMe(!rememberMe)} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn-login">
              Log in
            </button>
          </form>
          <p className="footer-text">
            Don't have an account? <a href="#signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;