//package com.app.todo_app.controller;
//
//
//import com.app.todo_app.models.User;
//import com.app.todo_app.services.UserDetailsServiceImp;
//import jakarta.validation.Valid;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.*;
//
//@Controller
//public class RegistrationController {
//
//    private final UserDetailsServiceImp userService;
//
//    public RegistrationController(UserDetailsServiceImp userService) {
//        this.userService = userService;
//    }
//
//    // Show registration form
//    @GetMapping("/register")
//    public String showRegistrationForm(Model model) {
//        model.addAttribute("user", new User());
//        return "register";  // renders register.html
//    }
//
//    // Process registration form submission
//    @PostMapping("/register")
//    public String registerUser(@Valid @ModelAttribute("user") User user,
//                               BindingResult result) {
//        if (result.hasErrors()) {
//            return "register";
//        }
//        userService.registerUser(user);
//        return "redirect:/home";  // after registration, go to home (tasks) page
//    }
//}
