import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: email, password: password }), // Mandamos 'name' como email para hacer login
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const userData = await response.json();

      // Usuario autenticado correctamente
      const loggedInUser = {
        name: userData.name,
        email: userData.name, // Suponemos que el campo 'name' es el email
        token: 'fake-jwt-token', // Puedes generar un token en el backend si decides usar JWT
      };

      handleLogin(loggedInUser);
    } catch (error) {
      setErrorMessage('Credenciales incorrectas, intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Iniciar Sesión</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={onLoginSubmit}>
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
          <button type="submit" className="btn-login">Iniciar Sesión</button>
        </form>
        <p className="link" onClick={() => handleLogin('register')}>
          ¿No tienes cuenta? Regístrate aquí
        </p>
      </div>
    </div>
  );
}

export default LoginPage;