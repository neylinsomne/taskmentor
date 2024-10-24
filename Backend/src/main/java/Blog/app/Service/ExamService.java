package Blog.app.Service;

import Blog.app.Blog.Exam;
import Blog.app.Blog.Question;
import Blog.app.Blog.Users;
import Blog.app.Repository.ExamRepository;
import Blog.app.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private UsersRepository usersRepository;

    // Devuelve todos los exámenes
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }


    // Busca un examen por su ID
    public Exam getExamById(String id) {
        Optional<Exam> exam = examRepository.findById(Long.parseLong(id));  // Usamos Long.parseLong si el ID es Long
        return exam.orElse(null);
    }

    // Crea un nuevo examen
    public Exam createExam(Exam exam) {
        exam.setCompleted(false);
        exam.setScore(0);
        exam.setRespuestas_correctas(correctQuestion(exam));
        return examRepository.save(exam);
    }

    // Corrige las respuestas de un examen
    public List<Integer> correctQuestion(Exam exam) {
        return exam.getQuestions().stream()
                .map(Question::getRespuesta_correcta)  // Usamos referencia de método de instancia
                .collect(Collectors.toList());  // Recoge todas las respuestas correctas en una lista
    }

    // Actualiza un examen existente
    public Exam updateExam(String id, Exam updatedExam) {
        Optional<Exam> examOptional = examRepository.findById(new ObjectId(id));  // Usamos ObjectId
        if (examOptional.isPresent()) {
            Exam exam = examOptional.get();
            exam.setTitle(updatedExam.getTitle());
            exam.setDescription(updatedExam.getDescription());
            exam.setScore(updatedExam.getScore());
            exam.setCompleted(updatedExam.isCompleted());
            exam.setQuestions(updatedExam.getQuestions());
            return examRepository.save(exam);
        } else {
            throw new RuntimeException("Examen no encontrado");
        }
    }

    // Elimina un examen por su ID
    public void deleteExam(String id) {
        examRepository.deleteById(new ObjectId(id));  // Usamos ObjectId
    }
    // Obtener las respuestas correctas de un examen
    public List<Integer> getExamAnswers(String id) {
        Optional<Exam> examOptional = examRepository.findById(new ObjectId(id));
        if (examOptional.isPresent()) {
            Exam exam = examOptional.get();
            return exam.getRespuestas_correctas();  // Devuelve las respuestas correctas
        } else {
            return null;
        }
    }

    // Obtener una pregunta específica por ID de examen e índice
    public Question getExamQuestion(String id, int index) {
        Optional<Exam> examOptional = examRepository.findById(new ObjectId(id));
        if (examOptional.isPresent()) {
            Exam exam = examOptional.get();
            List<Question> questions = exam.getQuestions();
            if (index >= 0 && index < questions.size()) {
                return questions.get(index);  // Devuelve la pregunta en el índice indicado
            }
        }
        return null;
    }


}
