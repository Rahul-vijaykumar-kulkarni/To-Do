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
  // newTodo: Todo = { title: '', dueDate: '' };  // For creating a new task
   editingTodo: Todo | null = null; // Holds the todo being edited

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    // Initial fetch to load todos
    this.todoService.getTodos().subscribe((todos)=>{
      this.todos = todos;
      console.log(todos);
    });
    

    // Subscribe to todos$ to receive updates
    this.todoService.todos$.subscribe(todos => {
      console.log('Todos updated:', todos); // Debug: log the todos array
      this.todos = todos;
    });
  }

  toggleComplete(todo: Todo): void {
    this.todoService.toggleTodo(todo.id).subscribe();
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe();
  }
  //update todo // Set a todo for editing by making a clone so changes are temporary until saved
  editTodo(todo: Todo): void {
    this.editingTodo = { ...todo };
  }

  updateTodo(): void {
    if (this.editingTodo) {
      this.todoService.updateTodo(this.editingTodo.id, this.editingTodo.title,this.editingTodo.dueDate).subscribe(() => {
        this.editingTodo = null;
      });
    }
  }

  cancelEdit(): void {
    this.editingTodo = null;
  }

}