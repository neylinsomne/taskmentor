import React, { useState } from 'react';
import './App.css';
import ChooseLoginRegister from './components/ChooseLoginRegister';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserPerformancePage from './components/UserPerformancePage';
import StudentDashboard from './components/StudentDashboard';
import FeedbackPage from './components/FeedbackPage';

function App() {
  const [currentPage, setCurrentPage] = useState('choose'); // Página inicial
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para saber si el usuario está logueado
  const [user, setUser] = useState(null); // Estado para el usuario autenticado

  // Función para cambiar la página
  const renderPage = () => {
    switch (currentPage) {
      case 'choose':
        return <ChooseLoginRegister setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage handleLogin={handleLogin} />; // Corregido: pasar handleLogin
      case 'register':
        return <RegisterPage setCurrentPage={handleLogin} />;
      case 'performance':
        return <UserPerformancePage user={user} />;
      case 'dashboard':
        return <StudentDashboard user={user} />;
      case 'feedback':
        return <FeedbackPage user={user} />;
      default:
        return <ChooseLoginRegister setCurrentPage={setCurrentPage} />;
    }
  };

  // Función para manejar el login y redirigir al UserPerformancePage
  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUser(user); // Guardar el usuario autenticado
    setCurrentPage('dashboard'); // Iniciar en la página de desempeño después de login
  };

  // Función para manejar el logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null); // Eliminar el usuario cuando se cierra la sesión
    setCurrentPage('choose'); // Volver a la selección de login/registro
  };

  return (
    <div className="app-container">
      {/* Si el usuario está logueado, muestra la barra lateral */}
      {isLoggedIn ? (
        <div className="dashboard-container">
          <aside className="sidebar">
            <h2>TaskMentor</h2>
            <div className="user-info">
              <div className="user-avatar"></div>
              <p>{user ? user.email : 'Usuario'}</p> {/* Mostrar el email del usuario logueado */}
            </div>
            <nav className="menu">
              <button className="menu-item" onClick={() => setCurrentPage('dashboard')}>
                Inicio
              </button>
              <button className="menu-item" onClick={() => setCurrentPage('performance')}>
                Crear examenes
              </button>
              <button className="menu-item" onClick={() => setCurrentPage('feedback')}>
                Evaluación y Retroalimentación
              </button>
            </nav>
            <button className="logout" onClick={handleLogout}>Salir</button>
          </aside>

          <main className="content">
            {renderPage()}
          </main>
        </div>
      ) : (
        renderPage() // Si no está logueado, muestra la página de login o registro
      )}
    </div>
  );
}

export default App;
