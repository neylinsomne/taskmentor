package Blog.app;

import Blog.app.Blog.Exam;
import Blog.app.Service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@SpringBootApplication()

public class ChatController {

    @Autowired
    private Chat chatService;
    @Autowired
    private ExamService examService;
    @PostMapping("/generateQuestions")
    public String generateQuestions(@RequestParam int cantidadPreguntas,
                                    @RequestParam String tema,
                                    @RequestParam String nivelDificultad) {
        try {
            return chatService.generateQuestions(cantidadPreguntas, tema, nivelDificultad);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error generando preguntas: " + e.getMessage();
        }
    }

    @PostMapping("/saveExam")
    public String saveExamToMongo(@RequestBody String jsonResponse) {
        try {
            // Llama al método saveToMongoDB para guardar el JSON en MongoDB
            chatService.saveToMongoDB(jsonResponse);
            return "Examen guardado exitosamente en MongoDB.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error guardando el examen: " + e.getMessage();
        }
    }
}
