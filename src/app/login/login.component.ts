import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule] // ✅ Import ReactiveFormsModule
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {
            // Log tokens to the console for debugging
            console.log('fr',data);
        console.log('Access Token:', data.access_token);
        console.log('Refresh Token:', data.refresh_token);
        //debug
          localStorage.setItem('access_token', data.access_token);  //check
          localStorage.setItem('refresh_token', data.refresh_token);
          this.router.navigate(['/todo']);
        },
        error: () => {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      });
    }
  }
}
