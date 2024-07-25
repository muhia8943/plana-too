// src/app/view-bookings/view-bookings.component.ts
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-bookings',
  standalone:true,
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css'],
  imports: [RouterLink, CommonModule]
})
export class ViewBookingsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe(
      (data) => {
        this.bookings = data;
      },
      (error) => {
        console.error('Error fetching bookings', error);
      }
    );
  }
}
