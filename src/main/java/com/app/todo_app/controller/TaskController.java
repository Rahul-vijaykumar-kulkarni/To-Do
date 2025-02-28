package com.app.todo_app.controller;

import com.app.todo_app.models.Task;
import com.app.todo_app.services.TaskService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RequestMapping("/home")
@Controller
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
@GetMapping
    public String getTask(Model model){
        List<Task> tasks = taskService.getAlltask();
        model.addAttribute("tasks",tasks);
        return "tasks";
    }

    @PostMapping
    public String CreateTask(@RequestParam String title ){
        taskService. CreateTask(title);

        return "redirect:/home";
    }
    @GetMapping("/{id}/delete")
    public String deleteTask(@PathVariable long id){
       taskService.deleteTask(id);
        return "redirect:/home";
    }
    @GetMapping("/{id}/toggle")
    public String toggleTask(@PathVariable long id){
        taskService.toggleTask(id);
        return "redirect:/home";
    }
}

