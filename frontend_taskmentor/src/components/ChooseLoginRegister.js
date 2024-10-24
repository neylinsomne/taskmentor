import React from 'react';
import './ChooseLoginRegister.css'; // Estilos para esta página

function ChooseLoginRegister({ setCurrentPage }) {
  return (
    <div className="choose-container">
      <div className="choose-content">
        <h1>Bienvenido a TaskMentor</h1>
        <p>Selecciona una opción para continuar</p>
        <div className="choose-buttons">
          <button className="btn" onClick={() => setCurrentPage('login')}>
            Iniciar Sesión
          </button>
          <button className="btn" onClick={() => setCurrentPage('register')}>
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChooseLoginRegister;
