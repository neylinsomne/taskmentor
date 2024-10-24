import { useState } from 'react';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatbot = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen && messages.length === 0) {
      setMessages([
        { sender: 'Chatbot', text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?' }
      ]);
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    // Añadir el mensaje del usuario al estado
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'Tú', text: userMessage }
    ]);

    try {
      const response = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data); // Para depuración

      // Añadir la respuesta del chatbot al estado
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'Chatbot', text: data.response }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'Chatbot', text: 'Lo siento, hubo un error al procesar tu mensaje.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar envío con la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Bienvenido a mi Aplicación Talento Tech</h1>
        <div id="chatbot-container">
          <div id="chatbot-header" onClick={toggleChatbot}>
            Chatbot
          </div>
          {isChatOpen && (
            <div id="chatbot-body">
              <div id="chat-messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender === 'Tú' ? 'user-message' : 'bot-message'}`}>
                    <strong>{msg.sender}:</strong> {msg.text}
                  </div>
                ))}
                {isLoading && <div className="loading">Escribiendo...</div>}
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="chatbot-input"
                  placeholder="Escribe tu mensaje"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <button onClick={sendMessage} disabled={isLoading}>
                  {isLoading ? '...' : 'Enviar'}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;