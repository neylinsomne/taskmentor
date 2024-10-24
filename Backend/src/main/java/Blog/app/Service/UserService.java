package Blog.app.Service;

import Blog.app.Blog.Users;
import Blog.app.Repository.ExamRepository;
import Blog.app.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UsersRepository userRepository;
    @Autowired
    private ExamRepository examRepository;

    public Users createUser(Users user) {

        return userRepository.save(user);
    }

    // Obtener todos los usuarios
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    // Obtener un usuario por ID
    public Optional<Users> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Actualizar un usuario
    public Users updateUser(Long id, Users userDetails) {
        Optional<Users> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            user.setName(userDetails.getName());
            user.setMail(userDetails.getMail());
            user.setPassword(userDetails.getPassword());
            user.setExams(userDetails.getExams());
            return userRepository.save(user);
        } else {
            return null; // Manejar caso cuando no se encuentra el usuario
        }
    }

    // Eliminar un usuario
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    public Users findByName(String name) {
        return userRepository.findByName(name);
    }
}
