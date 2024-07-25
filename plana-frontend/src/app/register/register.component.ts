import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface User {
  username: string;
  email: string;
  password: string;
  Role: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = {
    username: '', email: '', password: '',
    Role: ''
  };
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.user).subscribe(
      response => {
        this.successMessage = 'Registration successful!';
        console.log('User registered successfully', response);
        window.alert('user registered');
      },
      error => {
        console.error('Error registering user', error);
        this.successMessage = ''; // Clear message if there's an error
      }
    );
  }
}
