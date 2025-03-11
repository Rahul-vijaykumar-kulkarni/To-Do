import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  newTodo: string = '';
  newDueDate: string = ''; // New property for due date

  constructor(private todoService: TodoService) { }


    // // Updated addTodo to send both title and dueDate
  addTodo(): void {
        // Check that both title and due date are provided
    if (this.newTodo.trim() && this.newDueDate) {
      const todo: Todo = {
        title: this.newTodo.trim(),
        comp: false,
        id: 0,
        dueDate: this.newDueDate
      };

      this.todoService.addTodo(todo).subscribe({
        next: () => {
          this.newTodo = ''; // Clear the input field
          this.newDueDate = '';   // Clear the due date field
        },
        error: (err) => console.error('Error adding todo:', err)
      });
      
    }
    else {
      alert("Please enter both a title and a due date.");
    }
  }
}