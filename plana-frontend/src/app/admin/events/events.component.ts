import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  imports:[RouterLink, CommonModule]
})
export class EventsComponent implements OnInit {
  users: any[] = [];
  events: any[] = [];
  bookings: any[] = [];
  totalUsers: number = 0;
  totalEvents: number = 0;
  totalBookings: number = 0;
  totalEarnings: number = 0;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadEvents();
    this.loadBookings();
  }

  loadUsers(): void {
    this.analyticsService.getAllUsers().subscribe((data: any) => {
      this.users = data;
      this.totalUsers = data.length;
    });
  }

  loadEvents(): void {
    this.analyticsService.getAllEvents().subscribe((data: any) => {
      this.events = data;
      this.totalEvents = data.length;
      this.calculateTotalEarnings();
    });
  }

  loadBookings(): void {
    this.analyticsService.getAllBookings().subscribe((data: any) => {
      this.bookings = data;
      this.totalBookings = data.length;
    });
  }

  calculateTotalEarnings(): void {
    this.totalEarnings = this.events.reduce((sum, event) => sum + event.totalEarnings, 0);
  }
}
