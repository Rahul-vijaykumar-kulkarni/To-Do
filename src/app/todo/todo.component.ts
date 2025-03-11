// src/app/todo/todo.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  standalone: true,
  selector: 'app-todo',
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow">
            <div class="card-body p-4 position-relative">
              <!-- Logout Button -->
              <button
                class="btn btn-danger btn-sm position-absolute top-0 end-0 mt-3 me-3"
                (click)="logout()"
              >
                <i class="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>

              <h1 class="text-center mb-4 display-5 text-primary">
                <i class="bi bi-check2-circle me-2"></i>
                Todo List
              </h1>
              <app-todo-form></app-todo-form>
              <app-todo-list></app-todo-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .position-relative {
        position: relative;
      }
      .position-absolute {
        position: absolute;
      }
      .top-0 {
        top: 0;
      }
      .end-0 {
        right: 0;
      }
      .mt-3 {
        margin-top: 1rem;
      }
      .me-3 {
        margin-right: 1rem;
      }
    `,
  ],
  imports: [TodoFormComponent, TodoListComponent],
})
export class TodoComponent {
  constructor(private router: Router) {} // Inject Router

  // Logout method
  logout() {
    // Remove access_token and other data from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token'); // If you have a refresh token
    localStorage.removeItem('user'); // If you store user data

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}