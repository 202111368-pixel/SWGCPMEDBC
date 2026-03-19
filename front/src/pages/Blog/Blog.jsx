import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FaUserCircle, FaCalendarAlt, FaComments, FaPenNib } from "react-icons/fa";
import "./Blog.css";
import nicolasImg from "../../assets/nicolas.jpg";

const Blog = () => {
  const [comentarios, setComentarios] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", correo: "", mensaje: "" });

  const articulos = [
    {
      id: 1,
      titulo: "Diseño y Estructura en Melamina Moderna",
      categoria: "Especialidades",
      autor: "D’Bary Company",
      fecha: "19 Marzo, 2026",
      resumen: "Explora las últimas técnicas en armado de mobiliario funcional, optimizando el uso de tableros y herrajes de alta resistencia para proyectos de larga duración.",
      imagen: nicolasImg 
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoComentario = {
      id: Date.now(),
      nombre: formData.nombre,
      texto: formData.mensaje,
      fecha: new Date().toLocaleDateString()
    };

    setComentarios([nuevoComentario, ...comentarios]);
    setFormData({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <div className="blog-page-wrapper">
      <Navbar />
      
      <main className="blog-container">
        <header className="blog-header">
          <h1>Nuestro <span>Blog</span></h1>
        </header>

        {articulos.map((post) => (
          <article key={post.id} className="blog-post-main">
            <div className="post-image-wrapper">
              <img src={post.imagen} alt={post.titulo} className="post-image-hero" />
              <div className="post-category-tag">{post.categoria}</div>
            </div>

            <div className="post-content">
              <h2 className="post-title">{post.titulo}</h2>
              
              <div className="post-meta-ia">
                <span><FaUserCircle /> {post.autor}</span>
                <span><FaCalendarAlt /> {post.fecha}</span>
                <span><FaComments /> {comentarios.length} Comentarios</span>
              </div>

              <div className="post-body">
                <p>{post.resumen}</p>
                <p>La melamina ha evolucionado de ser un material básico a convertirse en la pieza angular del diseño de interiores contemporáneo, ofreciendo texturas que imitan fielmente la madera natural con una resistencia superior.</p>
              </div>
            </div>
          </article>
        ))}

        <section className="comentarios-section">
          <div className="section-title">
            <FaComments /> <h3>Discusión ({comentarios.length})</h3>
          </div>

          <div className="lista-comentarios">
            {comentarios.length === 0 ? (
              <p className="no-comments">Sé el primero en compartir tu opinión sobre este artículo.</p>
            ) : (
              comentarios.map((c) => (
                <div key={c.id} className="comentario-item">
                  <div className="user-avatar">{c.nombre.charAt(0).toUpperCase()}</div>
                  <div className="comentario-body">
                    <div className="comentario-info">
                      <strong>{c.nombre}</strong>
                      <span>{c.fecha}</span>
                    </div>
                    <p>{c.texto}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="form-comentario-container">
            <div className="form-title">
              <FaPenNib /> <h3>Escribir Comentario</h3>
            </div>
            
            <form className="comment-form" onSubmit={handleSubmit}>
              <textarea 
                placeholder="¿Qué piensas sobre este tema? Escribe aquí..." 
                value={formData.mensaje}
                onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                required 
              ></textarea>
              
              <div className="form-inputs-grid">
                <input 
                  type="text" 
                  placeholder="Tu Nombre*" 
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Tu Correo Electrónico*" 
                  value={formData.correo}
                  onChange={(e) => setFormData({...formData, correo: e.target.value})}
                  required 
                />
                <button type="submit" className="btn-publicar">
                  Publicar Comentario
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;