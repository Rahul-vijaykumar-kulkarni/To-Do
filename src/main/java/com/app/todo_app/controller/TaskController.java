package com.app.todo_app.controller;

import com.app.todo_app.models.Task;
import com.app.todo_app.services.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController // Use RestController instead of Controller
@RequestMapping("/home")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getTask() {
        return ResponseEntity.ok(taskService.getAllTasksForCurrentUser());
    }

    @PostMapping
    public ResponseEntity<String> createTask(@RequestBody Task task) { // Use RequestBody
        taskService.createTask(task.getTitle(), task.getDueDate()); //
        return ResponseEntity.ok("Task created successfully");
    }

    @DeleteMapping("/{id}") // Use proper HTTP method
    public ResponseEntity<String> deleteTask(@PathVariable long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully");
    }

    @PutMapping("/{id}/toggle") // Use proper HTTP method
    public ResponseEntity<String> toggleTask(@PathVariable long id) {
        taskService.toggleTask(id);
        return ResponseEntity.ok("Task toggled successfully");
    }
    //update task
    @PutMapping("/{id}")
    public ResponseEntity<String> updateTask(@PathVariable long id, @RequestBody Task task) {
        taskService.updateTask(id, task.getTitle());
        return ResponseEntity.ok("Task updated successfully");
    }
}