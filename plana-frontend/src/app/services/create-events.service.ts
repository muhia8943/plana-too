import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CreateEventsService {
  getEvents() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/api/events';

  constructor(private http: HttpClient) {}

  createEvent(event: Event): Observable<any> {
    return this.http.post(`${this.apiUrl}`, event);
  }
}
