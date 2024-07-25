import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls as { [key: string]: FormControl };
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.login(this.f['email'].value, this.f['password'].value).subscribe({
      next: (response) => {
        const role = response.Role;
        window.alert('Login successful!');
        if (role === 'admin') {
          this.router.navigate(['/events']);
        } else if (role === 'manager') {
          this.router.navigate(['/manager']);
        } else {
          this.router.navigate(['/userdashboard']);
        }
      },
      error: (error) => {
        this.error = 'Login failed. Please check your credentials.';
      }
    });
  }
}
