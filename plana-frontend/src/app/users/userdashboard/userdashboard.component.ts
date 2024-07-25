import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserdashboardService } from '../../services/userdashboard.service';

@Component({
  selector: 'app-userdashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  events: any[] = [];
  tickets: any[] = [];
  showTicketsModal: boolean = false;
  selectedEvent: any = null;
  userId: number = 1; // Example user ID, replace with actual logic to get the logged-in user's ID

  constructor(private userdashboardService: UserdashboardService) {}

  ngOnInit(): void {
    this.userdashboardService.getEvents().subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  getTickets(eventId: number): void {
    this.userdashboardService.getTicketsByEvent(eventId).subscribe(
      (data) => {
        this.tickets = data;
        this.selectedEvent = this.events.find(event => event.EventID === eventId);
        this.showTicketsModal = true;
      },
      (error) => {
        console.error('Error fetching tickets', error);
      }
    );
  }

  closeTicketsModal(): void {
    this.showTicketsModal = false;
    this.selectedEvent = null;
    this.tickets = [];
  }

  bookTicket(ticketId: number): void {
    this.userdashboardService.bookTicket(this.userId, ticketId).subscribe(
      (response) => {
        console.log('Ticket booked successfully', response);
        window.alert('Ticket booked successfully!'); // Show an alert message
        this.closeTicketsModal(); // Close the modal after booking
      },
      (error) => {
        console.error('Error booking ticket', error);
        alert('Error booking ticket. Please try again later.'); // Show an alert message for error
      }
    );
  }
}
