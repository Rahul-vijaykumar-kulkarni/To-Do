import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule,ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: [
        '', 
        [
          Validators.required,
          Validators.maxLength(20),
          this.strongUsernameValidator
        ]
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: [
        '', 
        [
          Validators.required,
          this.strongPasswordValidator
        ]
      ],
      role: ['USER', Validators.required]
    });
  }

  // Custom validator for strong username: must contain at least one uppercase letter, one digit, and one special character.
  strongUsernameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
    return pattern.test(value) ? null : { weakUsername: true };
  }

  // Custom validator for strong password: must contain at least one uppercase letter, one digit, and one special character.
  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
    return pattern.test(value) ? null : { weakPassword: true };
    
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (data) => {
          this.successMessage = 'Registration successful! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
    } else {
      // Mark all controls as touched to display validation errors
      this.registerForm.markAllAsTouched();
    }
  }
}
