package com.app.todo_app.services;

import com.app.todo_app.models.Task;
import com.app.todo_app.models.User;
import com.app.todo_app.repository.TaskRepo;
import com.app.todo_app.repository.UserRepository;
import com.app.todo_app.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    /**
     * @param
     */
    public void createTask(String title, LocalDate dueDate) {
        User currentUser = getCurrentUser();
        Task task = new Task();
        task.setTitle(title);
        task.setComp(false);
        task.setDueDate(dueDate); // Set the due date from the payload
        task.setUser(currentUser);  // Associate with user
        taskRepo.save(task);
    }
    //update task
    public void updateTask(long id, String title) {
        User currentUser = getCurrentUser();
        Task task = taskRepo.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new IllegalArgumentException("Task not found or unauthorized in update task"));
        task.setTitle(title);
        taskRepo.save(task);
    }

    public void deleteTask(long id) {
        User currentUser = getCurrentUser();
        Task task = taskRepo.findByIdAndUser(id, currentUser)
                .orElseThrow(() -> new IllegalArgumentException("Task not found or unauthorized in delete task"));
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
        System.out.println("Retrieving user with username: " + username); // Add this line
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


}