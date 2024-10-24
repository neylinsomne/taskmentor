package Blog.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@Service
public class Chat {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    private static final String TEMPLATE = """
        Eres un experto profesor generando preguntas de opción múltiple.
        Necesito que generes %d preguntas de opción múltiple sobre %s con un nivel de dificultad %s.

        Requisitos para las preguntas:
        1. Cada pregunta debe tener exactamente 4 opciones: A, B, C y D.
        2. Solo debe haber una respuesta correcta por pregunta.
        3. Las preguntas deben ser desafiantes y hacer pensar al estudiante.
        4. El nivel de dificultad %s debe reflejarse en la complejidad de las preguntas.

        La salida debe estar en el siguiente formato JSON exacto:
        {
            "Exam": {
                "Question": {
                    "pregunta": "texto de la pregunta",
                    "opciones": {
                        "texto opción A",
                        "texto opción B",
                        "texto opción C",
                        "texto opción D"
                    },
                    "respuesta_correcta": {
                        "numero": 1
                    }
                },
                "Pregunta_2": {
                    ... (mismo formato para cada pregunta)
                }
            }
        }

        Asegúrate de que el JSON sea válido y siga exactamente esta estructura.
    """;

    public String generateQuestions(int cantidadPreguntas, String tema, String nivelDificultad) throws Exception {
        String prompt = String.format(TEMPLATE, cantidadPreguntas, tema, nivelDificultad,tema);

        HttpClient client = HttpClient.newHttpClient();
        String requestBody = String.format("""
            {
                        "model": "gpt-3.5-turbo",
                        "messages": [
                            {
                                "role": "user",
                                "content": "Eres un experto profesor generando preguntas de opción múltiple. Necesito que generes 5 preguntas de opción múltiple sobre Matematicas con un nivel de dificultad Facil. Requisitos para las preguntas: 1. Cada pregunta debe tener exactamente 4 opciones: A, B, C y D. 2. Solo debe haber una respuesta correcta por pregunta. 3. Las preguntas deben ser desafiantes y hacer pensar al estudiante. 4. El nivel de dificultad Matematicas debe reflejarse en la complejidad de las preguntas. La salida debe estar en el siguiente formato JSON exacto: {\\"Examen\\": {\\"Pregunta_1\\": {\\"enunciado\\": \\"texto de la pregunta\\", \\"opciones\\": {\\"A\\": \\"texto opción A\\", \\"B\\": \\"texto opción B\\", \\"C\\": \\"texto opción C\\", \\"D\\": \\"texto opción D\\"}, \\"respuesta_correcta\\": {\\"letra\\": \\"A\\", \\"explicacion\\": \\"explicación de por qué esta es la respuesta correcta\\"}}, \\"Pregunta_2\\": { ... (mismo formato para cada pregunta) }}} Asegúrate de que el JSON sea válido y siga exactamente esta estructura."
                            }
                        ]
                    }
                
        """, prompt);
        System.out.println(requestBody);  // Verifica el JSON antes de enviarlo.

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    // Use your MongoDB Atlas connection string here
    private static final String MONGO_URI = "mongodb+srv://Neyl:12345678901@cluster1.att0w.mongodb.net/";

    public void saveToMongoDB(String jsonResponse) {
        // Connect to MongoDB Atlas
        MongoClient mongoClient = MongoClients.create(MONGO_URI);
        MongoDatabase database = mongoClient.getDatabase("Usuarios");
        MongoCollection<Document> collection = database.getCollection("Examenes");

        // Convert JSON response to a BSON Document and insert into MongoDB
        Document document = Document.parse(jsonResponse);
        collection.insertOne(document);

        // Close the connection
        mongoClient.close();
    }

}
