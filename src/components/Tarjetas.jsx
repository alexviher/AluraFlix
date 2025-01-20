import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import BorrarButton from './BorrarButton'; 
import './Tarjetas.css';

const Tarjetas = () => {
  const [videos, setVideos] = useState([]);
  const [videoSeleccionado, setVideoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3001/videos');
        const videos = await response.json();
        setVideos(videos);
      } catch (error) {
        console.error('Error al obtener los videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const categorias = ['Frontend', 'Backend', 'Fullstack'];

  const handleVideoClick = (video) => {
    window.open(video.link, '_blank');
  };

  const handleEditarClick = (video) => {
    setVideoSeleccionado(video);
  };

  const handleGuardar = async (videoActualizado) => {
    const nuevosVideos = videos.map((video) =>
      video.id === videoActualizado.id ? videoActualizado : video
    );
    setVideos(nuevosVideos);

    try {
      await fetch(`http://localhost:3001/videos/${videoActualizado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(videoActualizado),
      });
    } catch (error) {
      console.error('Error al guardar el video:', error);
    }
  };

  const handleBorrar = (videoId) => {
    const nuevosVideos = videos.filter((video) => video.id !== videoId);
    setVideos(nuevosVideos);
  };

  // Función para obtener el color de contorno según la categoría
  const obtenerColorContorno = (categoria) => {
    switch (categoria) {
      case 'Frontend':
        return 'yellow'; // Amarillo para Frontend
      case 'Backend':
        return 'green'; // Verde para Backend
      case 'Fullstack':
        return 'orange'; // Naranja para Fullstack
      default:
        return 'gray'; // Gris por defecto
    }
  };

  return (
    <div className="tarjetas-container">
      {categorias.map((categoria) => (
        <div key={categoria} className="categoria-section">
          <h2 className={categoria.toLowerCase()}>{categoria.toUpperCase()}</h2>
          <div className="tarjetas-grid">
            {videos
              .filter((video) => video.categoria === categoria)
              .map((video) => (
                <div
                  key={video.id}
                  className={`tarjeta ${categoria.toLowerCase()}`} // Añadimos una clase dinámica
                  onClick={() => handleVideoClick(video)} // Llamada a handleVideoClick para abrir en nueva pestaña
                  style={{
                    border: `2px solid ${obtenerColorContorno(categoria)}`, // Establecemos el color de contorno
                  }}
                >
                  <img src={video.imagen} alt={video.nombre} />
                  <h3>{video.nombre}</h3>
                  <div className="tarjeta-buttons">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditarClick(video);
                      }}
                    >
                      Editar
                    </button>
                    <BorrarButton videoId={video.id} onBorrar={handleBorrar} /> {/* Usamos el componente BorrarButton */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      {videoSeleccionado && (
        <Modal
          video={videoSeleccionado}
          onClose={() => setVideoSeleccionado(null)}
          onSave={handleGuardar}
        />
      )}
    </div>
  );
};

export default Tarjetas;
