import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/users`);
  }

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/events`);
  }

  getAllBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookings`);
  }
}
