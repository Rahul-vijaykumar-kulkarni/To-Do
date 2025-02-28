package com.app.todo_app.repository;

import com.app.todo_app.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<Task,Long> {

}
