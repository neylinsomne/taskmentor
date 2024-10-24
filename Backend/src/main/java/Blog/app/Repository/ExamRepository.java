package Blog.app.Repository;

import Blog.app.Blog.Exam;
import org.bson.types.ObjectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    Optional<Exam> findById(ObjectId objectId);

    void deleteById(ObjectId objectId);
}