package Blog.app.Controller;

import Blog.app.Blog.Exam;
import Blog.app.Blog.Question;
import Blog.app.Service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exams")
public class ExamController {

    @Autowired
    private ExamService examService;


    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        List<Exam> exams = examService.getAllExams();
        if (!exams.isEmpty()) {
            return ResponseEntity.ok(exams);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable String id) {
        Exam exam = examService.getExamById(id);
        return exam != null ? ResponseEntity.ok(exam) : ResponseEntity.notFound().build();
    }


    // Crear un nuevo examen
    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        try {
            Exam createdExam = examService.createExam(exam);
            return ResponseEntity.ok(createdExam);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Actualizar un examen por ID
    @PutMapping("/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable String id, @RequestBody Exam updatedExam) {
        try {
            Exam exam = examService.updateExam(id, updatedExam);
            return ResponseEntity.ok(exam);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    // Obtener las respuestas correctas de un examen por ID
    @GetMapping("/{id}/answers")
    public ResponseEntity<List<Integer>> getExamAnswers(@PathVariable String id) {
        List<Integer> correctAnswers = examService.getExamAnswers(id);
        return correctAnswers != null ? ResponseEntity.ok(correctAnswers) : ResponseEntity.notFound().build();
    }

    // Obtener una pregunta específica por ID de examen e índice
    @GetMapping("/{id}/questions/{index}")
    public ResponseEntity<Question> getExamQuestion(@PathVariable String id, @PathVariable int index) {
        Question question = examService.getExamQuestion(id, index);
        return question != null ? ResponseEntity.ok(question) : ResponseEntity.notFound().build();
    }
}
