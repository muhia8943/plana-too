import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateEventsService } from '../../services/create-events.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-events',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './create-events.component.html',
  styleUrls: ['./create-events.component.css']
})
export class CreateEventsComponent {
  eventForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private createEventsService: CreateEventsService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      Title: ['', Validators.required],
      Category: [''],
      Description: [''],
      Date: ['', Validators.required],
      Time: ['', Validators.required],
      Location: ['', Validators.required],
      Price: [0, Validators.required],
      EventImage: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formData = this.eventForm.value;
      const eventDate = new Date(formData.Date);
      const eventTime = formData.Time.split(':'); // ["HH", "MM"]
      eventDate.setHours(parseInt(eventTime[0], 10));
      eventDate.setMinutes(parseInt(eventTime[1], 10));
      
      const event = {
        ...formData,
        Date: eventDate.toISOString(),
        Time: eventDate.toISOString() // Backend expects the same ISO string for Date and Time
      };

      this.createEventsService.createEvent(event).subscribe(
        response => {
          console.log('Event created successfully', response);
          window.alert('Event created successfully!');
          this.router.navigate(['/viewevents']);
        },
        error => {
          console.error('Error creating event', error);
        }
      );
    }
  }
}
