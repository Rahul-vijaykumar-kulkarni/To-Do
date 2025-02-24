package com.app.todo_app.services;

import com.app.todo_app.models.Task;
import com.app.todo_app.repository.TaskRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepo taskRepo;

    public TaskService(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    public List<Task> getAlltask() {
        return taskRepo.findAll();
    }

    public void CreateTask(String title) {
        Task task = new Task();
        task.setTitle(title);
        task.setComp(false);
        taskRepo.save(task);
    }

    public void deleteTask(long id) {
        taskRepo.deleteById(id);
    }

    public void toggleTask(long id) {
        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("invalid task"));
        task.setComp(!task.isComp());
        taskRepo.save(task);
    }
}
