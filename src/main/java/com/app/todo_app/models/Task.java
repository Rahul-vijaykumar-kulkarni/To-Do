package com.app.todo_app.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private boolean comp;

    private LocalDate dueDate; // New field for due date

    @ManyToOne(fetch = FetchType.LAZY)  // Many tasks can belong to one user
    @JoinColumn(name = "user_id")
    @JsonBackReference // Add this to break the circular reference
//    @JsonIgnore// Foreign key column in the task table
    private User user;

    // Add this method to set the user for the task
    public void setUser(User user) {
        this.user = user;
    }
}