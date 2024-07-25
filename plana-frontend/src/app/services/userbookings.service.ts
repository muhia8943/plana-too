import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserbookingsService {
  private bookingsUrl = 'http://localhost:3000/api/bookings';

  constructor(private http: HttpClient) { }

  getUserBookings(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.bookingsUrl}/user/${userId}`);
  }

  deleteBooking(bookingId: number): Observable<any> {
    return this.http.delete<any>(`${this.bookingsUrl}/${bookingId}`);
  }
}
