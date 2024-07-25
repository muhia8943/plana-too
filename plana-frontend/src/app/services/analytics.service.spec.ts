import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let httpTestingController: HttpTestingController;

  const mockUsers = [
    { id: 1, name: 'User One', email: 'userone@example.com' },
    { id: 2, name: 'User Two', email: 'usertwo@example.com' }
  ];

  const mockEvents = [
    { EventID: 1, Title: 'Event One', Description: 'Description One' },
    { EventID: 2, Title: 'Event Two', Description: 'Description Two' }
  ];

  const mockBookings = [
    { BookingID: 1, UserID: 1, EventID: 1 },
    { BookingID: 2, UserID: 2, EventID: 2 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnalyticsService]
    });

    service = TestBed.inject(AnalyticsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    service.getAllUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/auth/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers); // Respond with mock data
  });

  it('should get all events', () => {
    service.getAllEvents().subscribe(events => {
      expect(events).toEqual(mockEvents);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/events');
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents); // Respond with mock data
  });

  it('should get all bookings', () => {
    service.getAllBookings().subscribe(bookings => {
      expect(bookings).toEqual(mockBookings);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/bookings');
    expect(req.request.method).toBe('GET');
    req.flush(mockBookings); // Respond with mock data
  });
});
