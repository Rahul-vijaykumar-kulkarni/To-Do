import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { access } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/home';

  // BehaviorSubject to hold and emit the todos array
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Retrieve todos from backend, then map and store only the necessary properties
  getTodos(): Observable<Todo[]> {
    const headers = this.getHeaders();
    console.log('Request Headers:', headers);
    return this.http.get<Todo[]>(this.apiUrl, { headers }).pipe(
      tap(todos => this.todosSubject.next(todos))
    );
  }

  // Add a new todo and refresh the todos list
  addTodo(todo: Todo): Observable<any> {
    return this.http.post(this.apiUrl, { title: todo.title , dueDate: todo.dueDate}, { headers: this.getHeaders(), responseType: 'json' }).pipe(
      tap(() => {
        // Refresh todos after adding
        this.getTodos().subscribe();
      })
    );
  }

  // Toggle completion and refresh todos
  toggleTodo(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/toggle`, {}, { headers: this.getHeaders() }).pipe(
      tap(() => this.getTodos().subscribe())
    );
  }

  // Delete todo and refresh todos
  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      tap(() => this.getTodos().subscribe())
    );
  }

  //update task
  updateTodo(id: number, title: string,dueDate: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      { title , dueDate },
      { headers: this.getHeaders() }
    ).pipe(
      tap(() => this.getTodos().subscribe())
    );
  }

  // Safely get the access token from localStorage (only in browser)
  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
      
    }
    return null;
  }

  // Build HTTP headers with token if available
  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.getAccessToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
      console.log(token);
    }
    return headers;
  }
}