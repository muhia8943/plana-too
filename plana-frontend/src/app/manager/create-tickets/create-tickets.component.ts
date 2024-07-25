import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CreateEventsService } from '../../services/create-events.service';
import { CreateTicketsService } from '../../services/create-tickets.service';
import { EventsService } from '../../services/events.service';
import { CommonModule } from '@angular/common';

interface Event {
  EventID: number;
  Title: string;
  Category: string;
  Description: string;
  Date: string;
  Time: string;
  Location: string;
  Price: number;
  TicketID?: number;
}

@Component({
  selector: 'app-create-tickets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-tickets.component.html',
  styleUrls: ['./create-tickets.component.css']
})
export class CreateTicketsComponent implements OnInit {
  events: Event[] = [];
  showModal: boolean = false;
  ticketForm: FormGroup;
  selectedEventId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private createEventService: CreateEventsService,
    private createTicketsService: CreateTicketsService,
    private eventsService: EventsService,
    private router: Router
  ) {
    this.ticketForm = this.fb.group({
      TicketType: ['', Validators.required],
      Price: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventsService.getAllEvents().subscribe({
      next: (data) => this.events = data,
      error: (error) => console.error('There was an error!', error)
    });
  }

  openModal(eventId: number): void {
    this.selectedEventId = eventId;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedEventId = null;
  }

  onSubmit(): void {
    if (this.ticketForm.valid && this.selectedEventId) {
      const formData = this.ticketForm.value;
      formData.EventID = this.selectedEventId;

      this.createTicketsService.createTicket(formData).subscribe({
        next: (response) => {
          console.log('Ticket created:', response);
          window.alert('ticket created successfully');
          this.loadEvents(); // Refresh events to include the new ticket ID
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating ticket:', error);
        }
      });
    }
  }
}
