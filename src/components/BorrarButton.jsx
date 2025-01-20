
import React from 'react';

const BorrarButton = ({ videoId, onBorrar }) => {
  const handleBorrar = async (e) => {
    e.stopPropagation(); 
    try {
      // Eliminar el video en el servidor
      await fetch(`http://localhost:3001/videos/${videoId}`, {
        method: 'DELETE',
      });
      
      onBorrar(videoId);
    } catch (error) {
      console.error('Error al borrar el video:', error);
    }
  };

  return (
    <button onClick={handleBorrar}>Borrar</button>
  );
};

export default BorrarButton;
