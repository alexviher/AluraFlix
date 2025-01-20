import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import NuevoVideo from './pages/NuevoVideo';
import Footer from './components/Footer'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nuevo-video" element={<NuevoVideo />} />
      </Routes>
      <Footer /> {/* Agregamos el Footer aquí */}
    </Router>
  );
};

export default App;
