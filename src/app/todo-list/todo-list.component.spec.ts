// todo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule],
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
editingTodo: any;
  
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  toggleComplete(todo: Todo): void {
    todo.comp = !todo.comp;
    this.todoService.toggleTodo(todo.id).subscribe();
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
    });
  }
  //updating code
  // Called when user clicks the "Edit" button
  editTodo(todo: Todo): void {
    // Create a copy of the todo to avoid directly mutating the list
    this.editingTodo = { ...todo };
  }

  // Called when user saves the changes
  updateTodo(): void {
    if (this.editingTodo) {
      this.todoService.updateTodo(this.editingTodo.id, this.editingTodo.title,this.editingTodo.dueDate)
        .subscribe(() => {
          this.loadTodos();
          this.editingTodo = null;
        });
    }
  }

  // Called to cancel editing
  cancelEdit(): void {
    this.editingTodo = null;
  }
}