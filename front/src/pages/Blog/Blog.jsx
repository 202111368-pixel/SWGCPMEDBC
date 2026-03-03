import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
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
      resumen: "Explora las últimas técnicas en armado de mobiliario funcional, optimizando el uso de tableros y herrajes de alta resistencia.",
      imagen: nicolasImg 
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const telefono = "51962210340"; 
    const textoWhatsApp = `Hola D'Bary Company! Mi nombre es ${formData.nombre}. Mi consulta es: ${formData.mensaje} (Correo: ${formData.correo})`;
    const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(textoWhatsApp)}`;

    const nuevoComentario = {
      id: Date.now(),
      nombre: formData.nombre,
      texto: formData.mensaje,
      fecha: new Date().toLocaleDateString()
    };

    setComentarios([nuevoComentario, ...comentarios]);
    window.open(urlWhatsApp, "_blank");
    setFormData({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <div className="blog-page">
      <Navbar />
      
      <main className="blog-container">
        {articulos.map((post) => (
          <article key={post.id} className="blog-post-card fade-in-up">
            <div className="post-image-container">
              <img src={post.imagen} alt={post.titulo} className="post-image-small" />
            </div>
            <div className="post-content">
              <h2 className="post-title">{post.titulo}</h2>
              <div className="post-meta">
                <span>{post.categoria}</span> / <span>{comentarios.length} comentarios</span> / <span>{post.autor}</span>
              </div>
              <p className="post-excerpt">{post.resumen}</p>
            </div>
          </article>
        ))}

        {comentarios.length > 0 && (
          <section className="lista-comentarios fade-in-up">
            <h3>Comentarios ({comentarios.length})</h3>
            {comentarios.map((c) => (
              <div key={c.id} className="comentario-item">
                <strong>{c.nombre}</strong> <small>{c.fecha}</small>
                <p>{c.texto}</p>
              </div>
            ))}
          </section>
        )}

        <section className="comentarios-section fade-in-up">
          <h3>Deja Un Comentario</h3>
          <p className="form-info">Tu consulta será enviada directamente a nuestro WhatsApp para una atención rápida.</p>
          
          <form className="comment-form" onSubmit={handleSubmit}>
            <textarea 
              placeholder="Escribe tu comentario aquí..." 
              value={formData.mensaje}
              onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
              required 
            ></textarea>
            
            <div className="form-inputs">
              <input 
                type="text" 
                placeholder="Nombre*" 
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                required 
              />
              <input 
                type="email" 
                placeholder="Correo electrónico*" 
                value={formData.correo}
                onChange={(e) => setFormData({...formData, correo: e.target.value})}
                required 
              />
              <input type="text" placeholder="Web" />
            </div>
            
            <button type="submit" className="btn-publicar">
              Publicar y Consultar WhatsApp
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Blog;