import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Change baseUrl if needed
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Call the login endpoint with username and password
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Call the register endpoint with user details
  register(user: { firstName: string; lastName:string; role:"USER"; username: string;password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
}
