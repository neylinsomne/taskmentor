from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
import torch
import json
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from chaty import ChatbotModel  # Importamos la clase ChatbotModel desde el archivo chaty.py

# Inicializa la aplicación Flask
app = Flask(__name__)
CORS(app, resources={
    r"/chatbot": {
        "origins": ["http://localhost:3000", "http://127.0.0.1:3000"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Ruta principal que renderiza el archivo index.html
@app.route('/')
def index():
    return render_template('index.html')

# Cargar el modelo del chatbot solo una vez al iniciar el servidor
base_dir = os.path.dirname(os.path.abspath(__file__))
intents_file = os.path.join(base_dir, "intents_10000_no_accents.json")
model_dir = os.path.join(base_dir, "modelo")

# Crear una instancia de ChatbotModel
chatbot = ChatbotModel(model_dir, intents_file)

# Ruta que maneja las interacciones con el chatbot
@app.route('/chatbot', methods=['POST'])
def chatbot_route():
    try:
        # Recibe el mensaje del usuario desde el frontend
        data = request.get_json()
        user_message = data.get('message')

        # Genera la respuesta del chatbot utilizando la función get_response
        bot_response = chatbot.get_response(user_message)

        # Devuelve la respuesta del chatbot en formato JSON al frontend
        return jsonify({'response': bot_response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ejecuta la aplicación en modo de depuración
if __name__ == '__main__':
    app.run(debug=True, port=5000)
