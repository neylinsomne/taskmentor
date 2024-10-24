package Blog.app.Blog;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity

@NoArgsConstructor
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean completed;
    private float score;
    private String title;
    private String description;

    @ElementCollection
    private List<Integer> respuestas;

    @ElementCollection
    private List<Integer> respuestas_correctas;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Question> questions;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public float getScore() {
        return score;
    }

    public void setScore(float score) {
        this.score = score;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public List<Integer> getRespuestas() {
        return respuestas;
    }

    public void setRespuestas(List<Integer> respuestas) {
        this.respuestas = respuestas;
    }

    public List<Integer> getRespuestas_correctas() {
        return respuestas_correctas;
    }

    public void setRespuestas_correctas(List<Integer> respuestas_correctas) {
        this.respuestas_correctas = respuestas_correctas;
    }
}
