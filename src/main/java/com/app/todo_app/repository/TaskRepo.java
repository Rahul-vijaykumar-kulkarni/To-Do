package com.app.todo_app.repository;

import com.app.todo_app.models.Task;
import com.app.todo_app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepo extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
    Optional<Task> findByIdAndUser(Long id, User user); // For fetching a single task

}