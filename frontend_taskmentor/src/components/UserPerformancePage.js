import React, { useState } from 'react';
import './UserPerformancePage.css';

const UserPerformancePage = () => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);

  const correctAnswers = {
    0: "Respiración celular",
    1: "ADN",
    2: "ATP",
    3: "Fotosíntesis",
    4:  "Leucocitos"

  };

  const feedback = {
    0: " Las mitocondrias generan energía a través de la respiración celular",
    1: " El ADN almacena información genética, fundamental para la herencia y la función celular.",
    2: "El ATP es la fuente directa de energía utilizada por las células para diversas funciones",
    3:  "Las plantas convierten la luz solar en energía química a través de la fotosíntesis",
    4:  "Los leucocitos, o glóbulos blancos, protegen al cuerpo contra infecciones"
  };

  const generateExam = async () => {
    const simulatedQuestions = [
      { question: "¿Cuál es la función principal de las mitocondrias en las células?", choices: ["Síntesis de proteínas", "Respiración celular", "Digestión de desechos", "Reproducción celular"] },
      { question: "¿Cuál de los siguientes es un ejemplo de ácido nucleico?", choices: ["Glucosa", "ADN", "Colágeno", "Hemoglobina"] },
      { question: "¿Qué molécula es la fuente principal de energía en las células?", choices: ["ATP", "Glucógeno", "ARN", "Lípidos"] },
      { question: "¿Qué proceso convierte la luz solar en energía química en las plantas?", choices: ["Fotosíntesis", "Glucólisis", "Fermentación", "Respiración aeróbica"] },
      { question: "¿Qué tipo de células son responsables de la respuesta inmune en los organismos multicelulares?", choices: ["Eritrocitos", "Leucocitos", "Neuronas", "Miocitos"] },

    ].slice(0, numQuestions);
    setQuestions(simulatedQuestions);
    setResults(null);
    setUserAnswers({});
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer
    }));
  };

  const handleGrade = () => {
    let correctCount = 0;
    let feedbackMessages = [];

    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (userAnswer === correctAnswers[index]) {
        correctCount++;
      } else {
        feedbackMessages.push({ question: question.question, feedback: feedback[index] });
      }
    });

    setResults({ correctCount, total: questions.length, feedbackMessages });
  };

  return (
    <div className="dashboard-container">


      <div className="content">
        <div className="content-header">
          <h1>Generador de examenes</h1>

        </div>

        <div className="form-section">
          <h2>Crear nuevo quizz</h2>
          <div className="form-card">
            <h3>Perzonalizar items</h3>
            <form onSubmit={(e) => { e.preventDefault(); generateExam(); }}>
              <div className="input-group">
                <label htmlFor="topic">Temas:</label>
                <input
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  placeholder="Enter a topics"
                />
              </div>

              <div className="input-group">
                <label htmlFor="difficulty">Nivel de dificultad:</label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="easy">Facil</option>
                  <option value="medium">Media</option>
                  <option value="hard">Dificil</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="num">Numero de preguntas:</label>
                <select
                  id="num"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                </select>
              </div>

              <button type="submit" className="generate-btn">Genera examen</button>
            </form>
          </div>
        </div>

        {questions.length > 0 && (
          <div className="results-section">
            <h2>Generated Exam</h2>
            <div className="questions-list">
              {questions.map((question, index) => (
                <div className="question-card" key={index}>
                  <h3>{question.question}</h3>
                  {question.choices.map((choice, i) => (
                    <label key={i} className="choice-label">
                      <input
  type="radio"
  name={`question${index}`}  
  value={choice}
  onChange={() => handleAnswerChange(index, choice)}
/>
                      {choice}
                    </label>
                  ))}
                </div>
              ))}
            </div>

            {/* "Calificar" Button */}
            <div className="grade-section">
              <button onClick={handleGrade} className="grade-btn">Calificar</button>
            </div>
          </div>
        )}

        {/* Show results after grading */}
        {results && (
          <div className="results-summary">
            <h3>Your Score: {results.correctCount} / {results.total}</h3>
            {results.feedbackMessages.length > 0 && (
              <div className="feedback">
                <h4>Feedback on Incorrect Answers:</h4>
                {results.feedbackMessages.map((feedbackItem, index) => (
                  <div key={index} className="feedback-item">
                    <p><strong>{feedbackItem.question}</strong></p>
                    <p>{feedbackItem.feedback}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPerformancePage;