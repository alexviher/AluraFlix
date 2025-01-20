import React, { useEffect, useState } from 'react';
import './Banner.css';

const Banner = () => {
  const [ultimoVideo, setUltimoVideo] = useState(null);

  useEffect(() => {
    const fetchUltimoVideo = async () => {
      try {
        const response = await fetch('http://localhost:3001/videos');
        const videos = await response.json();
        if (videos.length > 0) {
          const ultimo = videos[videos.length - 1]; // Último video agregado
          setUltimoVideo(ultimo);
        }
      } catch (error) {
        console.error('Error al obtener el último video:', error);
      }
    };

    fetchUltimoVideo();
  }, []);

  if (!ultimoVideo) {
    return <p>Cargando banner...</p>;
  }

  return (
    <div className="banner">
      <div className="banner-info">
        <h2>{ultimoVideo.categoria.toUpperCase()}</h2>
        <h1>{ultimoVideo.nombre}</h1>
        <p>{ultimoVideo.descripcion}</p>
      </div>
      <div className="banner-image">
        <img src={ultimoVideo.imagen} alt={ultimoVideo.nombre} />
      </div>
    </div>
  );
};

export default Banner;
