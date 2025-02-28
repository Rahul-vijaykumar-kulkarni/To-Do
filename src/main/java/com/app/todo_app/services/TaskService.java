package com.app.todo_app.services;

import com.app.todo_app.models.Task;
import com.app.todo_app.models.User;
import com.app.todo_app.repository.TaskRepo;
import com.app.todo_app.repository.UserRepository;
import com.app.todo_app.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepo taskRepo;
    private final UserRepository userRepo;

    public TaskService(TaskRepo taskRepo, UserRepository userRepo) {
        this.taskRepo = taskRepo;
        this.userRepo = userRepo;
    }

    public List<Task> getAllTasksForCurrentUser() {
        User currentUser = getCurrentUser();
        return taskRepo.findByUser(currentUser);
    }

    public void createTask(String title) {
        User currentUser = getCurrentUser();
        Task task = new Task();
        task.setTitle(title);
        task.setComp(false);
        task.setUser(currentUser);  // Associate with user
        taskRepo.save(task);
    }

    public void deleteTask(long id) {
        User currentUser = getCurrentUser();
        Task task = taskRepo.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new IllegalArgumentException("Task not found or unauthorized"));
        taskRepo.delete(task);
    }

    public void toggleTask(long id) {
        User currentUser = getCurrentUser();
        Task task = taskRepo.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new IllegalArgumentException("Task not found or unauthorized"));
        task.setComp(!task.isComp());
        taskRepo.save(task);
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


}