import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserbookingsService } from '../../services/userbookings.service';

@Component({
  selector: 'app-userbookings',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './userbookings.component.html',
  styleUrls: ['./userbookings.component.css']
})
export class UserbookingsComponent implements OnInit {
  userId: number = 1; // Example user ID, replace with actual logic to get the logged-in user's ID
  bookings: any[] = [];
  total: number = 0;

  constructor(private userbookingsService: UserbookingsService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.userbookingsService.getUserBookings(this.userId).subscribe(
      (data) => {
        this.bookings = data;
        this.calculateTotal();
      },
      (error) => {
        console.error('Error fetching bookings', error);
      }
    );
  }

  deleteBooking(bookingId: number): void {
    this.userbookingsService.deleteBooking(bookingId).subscribe(
      (response) => {
        console.log('Booking deleted successfully', response);
        this.loadBookings(); // Refresh the bookings list
      },
      (error) => {
        console.error('Error deleting booking', error);
      }
    );
  }

  calculateTotal(): void {
    this.total = this.bookings.reduce((acc, booking) => acc + booking.Price, 0);
  }
}
