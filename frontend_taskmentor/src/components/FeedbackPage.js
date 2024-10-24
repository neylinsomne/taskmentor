import React, { useState } from 'react';
import './FeedbackPage.css';

function FeedbackPage() {
  const [selectedTask, setSelectedTask] = useState('');  // Tarea seleccionada
  const [chatInput, setChatInput] = useState('');        // Input del usuario
  const [chatLog, setChatLog] = useState([]);            // Historial del chat

  // Lista de trabajos para seleccionar
  const tasks = [ 'Trabajo de Biología'];

  // Llamada a la API del chatbot Flask
  const fetchLLMResponse = async (message) => {
    try {
      console.log("Enviando mensaje al servidor:", message);
      const response = await fetch('http://127.0.0.1:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message }),  // Enviar el mensaje del usuario
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Respuesta del backend:", data);
      return data.response || 'Error: No se pudo obtener respuesta de la IA';
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      return 'Error al comunicarse con la API';
    }
  };
  

  // Función para enviar el mensaje
  const handleSendMessage = async () => {
    if (chatInput.trim() === '' || selectedTask === '') return;

    const userMessage = { sender: 'user', message: chatInput };
    setChatLog([...chatLog, userMessage]);

    // Obtener respuesta del LLM (Flask)
    const aiResponse = await fetchLLMResponse(chatInput);
    const aiMessage = { sender: 'ai', message: aiResponse };
    setChatLog([...chatLog, userMessage, aiMessage]);

    setChatInput('');  // Limpiar el input después de enviar
  };

  return (
    <div className="feedback-container">
      <header className="content-header">
        <h1>Sube tus Tareas y Exámenes</h1>
        <input type="file" id="file-upload" className="file-upload" />
        <label htmlFor="file-upload" className="upload-btn">Subir Archivo📲</label>
      </header>

      <h1>🤖Retroalimentación de la IA🤖</h1>
      
      <div className="task-selector">
        <h2>Selecciona un trabajo:</h2>
        <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)}>
          <option value="">--Seleccionar Trabajo--</option>
          {tasks.map((task, index) => (
            <option key={index} value={task}>{task}</option>
          ))}
        </select>
      </div>

      <div className="chat-container">
        <div className="chat-log">
          {chatLog.map((entry, index) => (
            <div key={index} className={`chat-message ${entry.sender}`}>
              <p>{entry.message}</p>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Escribe tu mensaje..." />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
