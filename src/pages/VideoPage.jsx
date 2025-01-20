import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VideoPage = () => {
  const { id } = useParams(); 
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`http://localhost:3001/videos/${id}`);
        const videoData = await response.json();
        setVideo(videoData);
      } catch (error) {
        console.error('Error al obtener el video:', error);
      }
    };

    fetchVideo();
  }, [id]); 

  if (!video) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{video.nombre}</h1>
      <img src={video.imagen} alt={video.nombre} />
      <p>{video.descripcion}</p>
      
    </div>
  );
};

export default VideoPage;
