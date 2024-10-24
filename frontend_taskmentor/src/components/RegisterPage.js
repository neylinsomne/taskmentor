import React, { useState } from 'react';
import './RegisterPage.css';

function RegisterPage({ setCurrentPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), // Enviamos los datos al backend
      });

      if (!response.ok) {
        throw new Error('Error al registrarse');
      }

      // Si el registro es exitoso, redirigir a la página de rendimiento
      setCurrentPage('performance');
    } catch (error) {
      setErrorMessage('Error en el registro. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Registrarse</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Nombre</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              placeholder="Introduce tu nombre"
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Introduce tu email"
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Introduce tu contraseña"
            />
          </div>
          <button type="submit" className="btn-register">Registrarse</button>
        </form>
        <p className="link" onClick={() => setCurrentPage('login')}>
          ¿Ya tienes cuenta? Inicia sesión aquí
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;