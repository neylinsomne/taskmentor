import os
import torch
import numpy as np
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from sklearn.preprocessing import LabelEncoder
import json


class ChatbotModel:
    def __init__(self, model_dir, intents_file, max_sequence_len=20, confidence_threshold=0.7):
        self.model_dir = model_dir
        self.max_sequence_len = max_sequence_len
        self.confidence_threshold = confidence_threshold

        # Cargar intents y etiquetas
        self.intents = self.load_intents(intents_file)
        self.label_encoder = self.init_label_encoder()

        # Cargar el modelo y el tokenizer
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model, self.tokenizer = self.load_model_and_tokenizer()
        self.model.to(self.device)
        self.model.eval()  # Para asegurarse de que está en modo evaluación

        # Inicializar última opción para evitar respuestas repetidas
        self.ultima_opcion = None

    def load_intents(self, intents_file):
        """Cargar el archivo de intents desde un archivo JSON."""
        with open(intents_file, "r", encoding="utf-8") as file:
            intents = json.load(file)
        return intents

    def init_label_encoder(self):
        """Inicializa el codificador de etiquetas a partir de los intents."""
        labels = [intent['tag'] for intent in self.intents['intents']]
        label_encoder = LabelEncoder()
        label_encoder.fit(labels)
        return label_encoder

    def load_model_and_tokenizer(self):
        """Carga el modelo y el tokenizer desde el directorio especificado."""
        model = AutoModelForSequenceClassification.from_pretrained(self.model_dir)
        tokenizer = AutoTokenizer.from_pretrained(self.model_dir + '/tokenizer')
        return model, tokenizer

    def preprocess_text(self, text):
        """Preprocesa el texto: convertir en minúsculas y eliminar espacios extras."""
        return text.lower().strip()

    def tokenize_input(self, user_input):
        """Tokeniza el input del usuario."""
        return self.tokenizer(
            user_input, return_tensors="pt", padding=True, truncation=True, max_length=self.max_sequence_len
        ).to(self.device)

    def predict_intent(self, user_input):
        """Predice el intent basado en el input del usuario."""
        input_text = self.preprocess_text(user_input)
        inputs = self.tokenize_input(input_text)

        # Realizar predicción
        with torch.no_grad():
            outputs = self.model(**inputs)

        # Obtener logits y calcular probabilidades con softmax
        logits = outputs.logits
        probabilities = torch.softmax(logits, dim=-1).cpu().numpy()

        # Obtener el índice con mayor probabilidad
        intent_index = np.argmax(probabilities)
        max_prob = probabilities[0][intent_index]

        return intent_index, max_prob

    def get_response(self, user_input):
        """Genera la respuesta del chatbot basada en la predicción."""

        # Predecir el intent
        intent_index, max_prob = self.predict_intent(user_input)

        # Si la confianza es baja, pedir aclaración o sugerir una reformulación
        if max_prob < self.confidence_threshold:
            return "Lo siento, no estoy seguro de cómo responder a eso. ¿Podrías intentar reformular tu pregunta?"

        # Obtener el intent predicho (tag)
        intent_tag = self.label_encoder.inverse_transform([intent_index])[0]
        print(f"Intento predicho: {intent_tag}, con probabilidad: {max_prob}")

        # Evitar respuestas repetidas
        if self.ultima_opcion == intent_tag:
            return "Parece que ya te respondí algo similar. ¿Te gustaría saber más sobre otro tema?"

        # Guardar el último intent para evitar repetición de respuestas
        self.ultima_opcion = intent_tag

        # Lógica para manejar respuestas específicas por intent y palabras clave
        return self.generate_response_by_intent(intent_tag, user_input)

    def generate_response_by_intent(self, intent_tag, user_input):
        """Genera respuestas basadas en el intent y las palabras clave en el input."""

        # Convertir la entrada a minúsculas para facilitar la búsqueda de palabras clave
        user_input_lower = user_input.lower()

        if intent_tag == "ciencias":
            return self.handle_science_questions(user_input_lower)

        elif intent_tag == "fisica":
            return self.handle_physics_questions(user_input_lower)

        elif intent_tag == "historia":
            return self.handle_history_questions(user_input_lower)

        # Si no se detecta ningún intent, responder con un mensaje genérico
        return "Lo siento, no entendí tu mensaje. ¿Podrías intentar preguntar de otra manera?"

    def handle_science_questions(self, user_input):
        """Manejo de respuestas específicas para preguntas de ciencias."""
        if "adn" in user_input:
            return "El ADN, o ácido desoxirribonucleico, es la molécula que contiene las instrucciones genéticas."
        elif "evolución" in user_input:
            return "La evolución es el proceso por el cual las especies cambian con el tiempo a través de la selección natural."
        elif "ecosistema" in user_input:
            return "Un ecosistema es una comunidad de organismos vivos que interactúan entre sí y con su entorno, como el suelo y el agua."
        elif "dame un dato" in user_input:
            return "La fotosíntesis es el proceso por el cual las plantas convierten la luz solar en energía química, produciendo oxígeno."
        else:
            return "Las ciencias abarcan muchos temas, ¿podrías especificar de qué área te gustaría saber más?"

    def handle_physics_questions(self, user_input):
        """Manejo de respuestas específicas para preguntas de física."""
        if "newton" in user_input:
            return "Las leyes de Newton son tres principios fundamentales que describen el movimiento de los cuerpos."
        elif "gravedad" in user_input:
            return "La ley de la gravedad de Newton establece que todos los cuerpos se atraen mutuamente con una fuerza que es proporcional a sus masas."
        elif "energía" in user_input:
            return "En física, la energía se define como la capacidad de realizar un trabajo. Existen diferentes formas de energía como la cinética y la potencial."
        elif "dame un dato" in user_input:
            return "La teoría de la relatividad de Einstein revolucionó nuestra comprensión del espacio y el tiempo."
        else:
            return "La física es fascinante. ¿Te gustaría aprender sobre mecánica cuántica, relatividad, o algo más específico?"

    def handle_history_questions(self, user_input):
        """Manejo de respuestas específicas para preguntas de historia."""
        if "colón" in user_input or "descubrimiento" in user_input:
            return "Cristóbal Colón llegó a América en 1492, marcando un punto clave en la historia mundial."
        elif "revolución" in user_input:
            return "La Revolución Francesa fue un evento crucial que marcó el fin de la monarquía en Francia y el inicio de una nueva era política."
        elif "dame un dato" in user_input:
            return "El Imperio Romano fue uno de los imperios más grandes y poderosos de la historia, que duró más de mil años."
        else:
            return "La historia es vasta y rica. ¿Sobre qué evento o personaje histórico te gustaría aprender más?"


# Función principal para interactuar con el chatbot
def main():
    model_dir = "modelo"  # Ruta completa donde está guardado el modelo
    intents_file = "intents_10000_no_accents.json"  # Archivo JSON con los intents

    # Inicializar el modelo del chatbot
    chatbot = ChatbotModel(model_dir, intents_file)

    print("¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?")

    while True:
        user_input = input("Tú: ")

        # Verificar si el usuario quiere salir
        if user_input.lower() in ["salir", "exit", "quit"]:
            print("¡Hasta luego! 😊")
            break

        # Obtener la respuesta del chatbot
        response = chatbot.get_response(user_input)
        print(f"Chatbot: {response}")


if __name__ == "__main__":
    main()
