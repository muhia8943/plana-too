import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Ticket {
  TicketID: number;
  EventID: number;
  TicketType: string;
  Price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreateTicketsService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createTicket(ticket: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tickets`, ticket);
  }
  getTicketsByEvent(eventID: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/tickets/event/${eventID}`);
  }

}
