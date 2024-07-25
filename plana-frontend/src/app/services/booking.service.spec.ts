import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookingService } from './booking.service';

describe('BookingService', () => {
  let service: BookingService;
  let httpTestingController: HttpTestingController;

  const mockBookings = [
    { id: 1, event: 'Event 1', user: 'User 1', date: '2023-07-21' },
    { id: 2, event: 'Event 2', user: 'User 2', date: '2023-07-22' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingService]
    });

    service = TestBed.inject(BookingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all bookings', () => {
    service.getAllBookings().subscribe(bookings => {
      expect(bookings).toEqual(mockBookings);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/bookings');
    expect(req.request.method).toBe('GET');
    req.flush(mockBookings); // Respond with mock data
  });
});
