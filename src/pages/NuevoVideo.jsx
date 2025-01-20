import React, { useState } from 'react';
import Header from '../components/Header';
import './NuevoVideo.css';

const NuevoVideo = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'Frontend',
    imagen: '',
    link: '',
    descripcion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = async () => {
    try {
     
      const response = await fetch('http://localhost:3001/videos');
      const videos = await response.json();
  
      
      const nextId = videos.length > 0 ? Math.max(...videos.map(video => video.id)) + 1 : 1;
  
      
      const nuevoVideo = { id: nextId, ...formData };
  
      
      const saveResponse = await fetch('http://localhost:3001/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoVideo),
      });
  
      if (saveResponse.ok) {
        alert('Video guardado exitosamente.');
        setFormData({
          nombre: '',
          categoria: 'Frontend',
          imagen: '',
          link: '',
          descripcion: '',
        });
      } else {
        alert('Error al guardar el video.');
      }
    } catch (error) {
      console.error('Error al guardar el video:', error);
      alert('Error al conectar con el servidor.');
    }
  };
  

  const handleLimpiar = () => {
    setFormData({
      nombre: '',
      categoria: 'Frontend',
      imagen: '',
      link: '',
      descripcion: '',
    });
  };

  return (
    <>
      <Header />
      <div className="nuevo-video-container">
        <h1>Nuevo Video</h1>
        <h2>Rellene el formulario para agregar un nuevo video</h2>
        <form>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre del video"
            />
          </label>
          <label>
            Seleccionar Categoría:
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Fullstack">Fullstack</option>
            </select>
          </label>
          <label>
            Imagen:
            <input
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="URL de la imagen"
            />
          </label>
          <label>
            Link del Video:
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="URL del video"
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción del video"
            />
          </label>
          <div className="form-buttons">
            <button type="button" onClick={handleGuardar}>
              Guardar
            </button>
            <button type="button" onClick={handleLimpiar}>
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NuevoVideo;
