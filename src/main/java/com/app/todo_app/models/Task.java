package com.app.todo_app.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;
    private boolean comp;

    @ManyToOne(fetch = FetchType.LAZY)  // Many tasks can belong to one user
    @JoinColumn(name = "user_id")       // Foreign key column in the task table
    private User user;

    // Add this method to set the user for the task
    public void setUser(User user) {
        this.user = user;
    }
}