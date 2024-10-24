import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadarController,
  LineController,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Radar, Line } from 'react-chartjs-2';

// Registrar todos los componentes necesarios para radar y gráficos de línea
ChartJS.register(
  RadialLinearScale, // Escala para gráfico de radar
  CategoryScale, // Escala para categorías (gráfico de línea)
  LinearScale,   // Escala lineal para el gráfico de línea
  PointElement,
  LineElement,
  ArcElement,
  RadarController, // Controlador de gráfico de radar
  LineController,  // Controlador de gráfico de línea
  Title,
  Tooltip,
  Legend
);

import './UserPerformancePage.css';

function UserPerformancePage() {
  // Datos para el gráfico de radar/estrella
  const radarData = {
    labels: ['Participación', 'Tareas Completadas', 'Exámenes', 'Proyectos', 'Colaboración'],
    datasets: [
      {
        label: 'Desempeño',
        data: [80, 90, 85, 70, 75],
        backgroundColor: 'rgba(26, 188, 156, 0.2)',
        borderColor: '#1ABC9C',
        pointBackgroundColor: '#1ABC9C',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1ABC9C',
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
          max: 100,
          stepSize: 20,
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  // Datos para el gráfico de línea (progreso en el tiempo)
  const lineData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [
      {
        label: 'Promedio de Calificaciones',
        data: [85, 87, 90, 88, 92, 95, 94],
        fill: true,
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: '#3498DB',
        pointBackgroundColor: '#3498DB',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3498DB'
      }
    ]
  };

  const lineOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      }
    }
  };

  return (
    <div className="performance-container">
      <aside className="sidebar">
        <h2>Desempeño</h2>
        <nav className="menu">
          <button className="menu-item">Tareas</button>
          <button className="menu-item">Exámenes</button>
          <button className="menu-item">Proyectos</button>
          <button className="menu-item">Retroalimentación</button>
        </nav>
        <button className="logout">Salir</button>
      </aside>

      <main className="content">
        <header className="content-header">
          <h1>Desempeño del Usuario</h1>
        </header>

        <section className="charts-section">
          <div className="chart-container">
            <h2>Desempeño General</h2>
            <Radar data={radarData} options={radarOptions} />
          </div>
          <div className="chart-container">
            <h2>Progreso a lo largo del tiempo</h2>
            <Line data={lineData} options={lineOptions} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserPerformancePage;
