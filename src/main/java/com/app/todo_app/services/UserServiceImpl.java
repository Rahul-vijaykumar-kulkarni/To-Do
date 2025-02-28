//package com.app.todo_app.services;
//
//
//import com.app.todo_app.models.User;
//import com.app.todo_app.repository.UserRepository;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserServiceImpl implements UserService {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    // Inject both UserRepository and a PasswordEncoder (e.g., BCrypt)
//    public UserServiceImpl(UserRepository userRepository,
//                           PasswordEncoder passwordEncoder) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    @Override
//    public User registerUser(User user) {
//        // Optionally, add logic to check for duplicate usernames here.
//        user.setPassword(encodePassword(user.getPassword()));
//        return userRepository.save(user);
//    }
//
//    @Override
//    public String encodePassword(String rawPassword) {
//        return passwordEncoder.encode(rawPassword);
//    }
//
//    @Override
//    public long countUsers() {
//        return userRepository.count();
//    }
//}
