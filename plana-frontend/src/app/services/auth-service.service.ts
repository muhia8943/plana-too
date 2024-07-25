import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  username: string;
  email: string;
  password: string;
  Role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth/register';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}