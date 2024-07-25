import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserdashboardService } from '../services/userdashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EventDetailComponent implements OnInit {
  event: any;

  constructor(
    private route: ActivatedRoute,
    private userdashboardService: UserdashboardService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.userdashboardService.getEventById(eventId).subscribe(
        (data) => {
          this.event = data;
        },
        (error) => {
          console.error('Error fetching event details', error);
        }
      );
    } else {
      console.error('Event ID is null');
    }
  }
}
