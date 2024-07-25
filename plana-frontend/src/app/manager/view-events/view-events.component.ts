import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-events',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css']
})
export class ViewEventsComponent implements OnInit {
  events: any[] = [];
  editForm: FormGroup;
  showModal: boolean = false;
  selectedEventId: number | null = null;

  constructor(private eventsService: EventsService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      Category: [''],
      Title: ['', Validators.required],
      Description: [''],
      Price: [0, Validators.required],
      Date: ['', Validators.required],
      Time: ['', Validators.required],
      Location: ['', Validators.required],
      EventImage: ['', Validators.required]
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

  editEvent(event: any): void {
    this.selectedEventId = event.EventID;
    const eventDate = new Date(event.Date);
    const hours = eventDate.getHours().toString().padStart(2, '0');
    const minutes = eventDate.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    this.editForm.patchValue({
      ...event,
      Date: eventDate.toISOString().split('T')[0],
      Time: timeString,
      EventImage: event.EventImage || ''
    });
    this.showModal = true;
  }

  updateEvent(): void {
    if (this.selectedEventId !== null) {
      const formData = this.editForm.value;
      const eventDate = new Date(formData.Date);
      const eventTime = formData.Time.split(':'); // ["HH", "MM"]
      eventDate.setHours(parseInt(eventTime[0], 10));
      eventDate.setMinutes(parseInt(eventTime[1], 10));

      const updatedEvent = {
        ...formData,
        Date: eventDate.toISOString(),
        Time: eventDate.toISOString()  // Backend expects the same ISO string for Date and Time
      };

      this.eventsService.updateEvent(this.selectedEventId, updatedEvent).subscribe({
        next: () => {
          this.loadEvents();
          this.closeModal();
        },
        error: (error) => console.error('There was an error!', error)
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedEventId = null;
    this.editForm.reset();
  }

  deleteEvent(id: number): void {
    this.eventsService.deleteEvent(id).subscribe({
      next: () => this.loadEvents(),
      error: (error) => console.error('There was an error!', error)
    });
  }
}
