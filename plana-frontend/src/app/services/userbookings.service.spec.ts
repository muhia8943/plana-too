import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserbookingsService } from './userbookings.service';

describe('UserbookingsService', () => {
  let service: UserbookingsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserbookingsService]
    });

    service = TestBed.inject(UserbookingsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUserBookings', () => {
    it('should return expected bookings (HttpClient called once)', () => {
      const userId = 1;
      const expectedBookings = [
        { id: 1, event: 'Event 1', date: '2024-07-25' },
        { id: 2, event: 'Event 2', date: '2024-08-01' }
      ];

      service.getUserBookings(userId).subscribe(bookings => {
        expect(bookings).toEqual(expectedBookings);
      });

      const req = httpTestingController.expectOne(`${service['bookingsUrl']}/user/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedBookings);
    });

    it('should handle errors', () => {
      const userId = 1;
      const errorMessage = 'Error fetching bookings';

      service.getUserBookings(userId).subscribe(
        () => fail('Expected an error, not bookings'),
        error => {
          expect(error.error).toContain(errorMessage);
        }
      );

      const req = httpTestingController.expectOne(`${service['bookingsUrl']}/user/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('#deleteBooking', () => {
    it('should delete a booking and return success message', () => {
      const bookingId = 1;
      const successMessage = { message: 'Booking deleted successfully' };

      service.deleteBooking(bookingId).subscribe(response => {
        expect(response).toEqual(successMessage);
      });

      const req = httpTestingController.expectOne(`${service['bookingsUrl']}/${bookingId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(successMessage);
    });

    it('should handle errors when deleting a booking', () => {
      const bookingId = 1;
      const errorMessage = 'Error deleting booking';

      service.deleteBooking(bookingId).subscribe(
        () => fail('Expected an error, not success'),
        error => {
          expect(error.error).toContain(errorMessage);
        }
      );

      const req = httpTestingController.expectOne(`${service['bookingsUrl']}/${bookingId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });
});
