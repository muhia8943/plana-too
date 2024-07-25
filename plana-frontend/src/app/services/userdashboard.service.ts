import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdashboardService {

  private eventsUrl = 'http://localhost:3000/api/events';
  private bookingsUrl = 'http://localhost:3000/api/bookings';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.eventsUrl);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.eventsUrl}/${id}`);
  }

  getTicketsByEvent(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/tickets/event/${eventId}`);
  }

  bookTicket(userId: number, ticketId: number): Observable<any> {
    const bookingData = {
      userID: userId,
      ticketID: ticketId
    };
    return this.http.post<any>(this.bookingsUrl, bookingData);
  }
}
