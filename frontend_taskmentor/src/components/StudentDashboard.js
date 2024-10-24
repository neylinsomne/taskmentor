import React from 'react';
import './StudentDashboard.css';
import logo from './Logo.jpg';  // Asegúrate de que la ruta al archivo sea correcta

function StudentDashboard({ setCurrentPage }) {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a TaskMentor</h1>
      
      <div className="home-content">
        {/* Rectángulo con el logo */}
        <div className="logo-container">
          <img src={logo} alt="Logo TaskMentor" className="home-logo" />
        </div>
        
        {/* Texto explicativo */}
        <div className="home-description">
          <p>
            TaskMentor es una plataforma educativa dirigida a estudiantes de todo el mundo
            que buscan reforzar su conocimiento mediante la creación de exámenes personalizados
            y la obtención de retroalimentación detallada basada en IA.
          </p>
        </div>
        
        {/* Botones llamativos para acceder a las páginas */}
        <div className="home-buttons">
          <div className="home-card">
            <h2>Crear Exámenes</h2>
            <p>
              Genera tus propios exámenes personalizados eligiendo tema, dificultad y
              número de preguntas, todo con la ayuda de una inteligencia artificial.
            </p>
          </div>
          
          <div className="home-card">
            <h2>Evaluación y Retroalimentación</h2>
            <p>
              Sube tus exámenes para recibir retroalimentación detallada y basada en IA,
              ayudándote a mejorar tus conocimientos y habilidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
