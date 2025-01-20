import React from 'react';
import './Modal.css';

const Modal = ({ video, onClose, onSave }) => {
  const [formData, setFormData] = React.useState({ ...video });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData); // Llama al método para guardar los cambios
    onClose(); // Cierra el modal
  };

  if (!video) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Video</h2>
        <form>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
          <label>Categoría</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
          </select>
          <label>Imagen</label>
          <input
            type="text"
            name="imagen"
            value={formData.imagen}
            onChange={handleInputChange}
          />
          <label>Link del Video</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
          />
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
          ></textarea>
        </form>
        <div className="modal-buttons">
          <button onClick={handleSave}>Guardar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
