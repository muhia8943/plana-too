import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserdashboardService } from './userdashboard.service';

describe('UserdashboardService', () => {
  let service: UserdashboardService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserdashboardService]
    });

    service = TestBed.inject(UserdashboardService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getEvents', () => {
    it('should return expected events (HttpClient called once)', () => {
      const expectedEvents = [
        { id: 1, name: 'Event 1', date: '2024-07-25' },
        { id: 2, name: 'Event 2', date: '2024-08-01' }
      ];

      service.getEvents().subscribe(events => {
        expect(events).toEqual(expectedEvents);
      });

      const req = httpTestingController.expectOne(service['eventsUrl']);
      expect(req.request.method).toBe('GET');
      req.flush(expectedEvents);
    });

    it('should handle errors', () => {
      const errorMessage = 'Error fetching events';

      service.getEvents().subscribe(
        () => fail('Expected an error, not events'),
        error => {
          expect(error.error).toContain(errorMessage);
        }
      );

      const req = httpTestingController.expectOne(service['eventsUrl']);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('#getEventById', () => {
    it('should return expected event by ID (HttpClient called once)', () => {
      const eventId = '1';
      const expectedEvent = { id: 1, name: 'Event 1', date: '2024-07-25' };

      service.getEventById(eventId).subscribe(event => {
        expect(event).toEqual(expectedEvent);
      });

      const req = httpTestingController.expectOne(`${service['eventsUrl']}/${eventId}`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedEvent);
    });

    it('should handle errors', () => {
      const eventId = '1';
      const errorMessage = 'Error fetching event';

      service.getEventById(eventId).subscribe(
        () => fail('Expected an error, not an event'),
        error => {
          expect(error.error).toContain(errorMessage);
        }
      );

      const req = httpTestingController.expectOne(`${service['eventsUrl']}/${eventId}`);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('#getTicketsByEvent', () => {
    it('should return expected tickets (HttpClient called once)', () => {
      const eventId = 1;
      const expectedTickets = [
        { id: 1, type: 'Regular', price: 20 },
        { id: 2, type: 'VIP', price: 50 }
      ];

      service.getTicketsByEvent(eventId).subscribe(tickets => {
        expect(tickets).toEqual(expectedTickets);
      });

      const req = httpTestingController.expectOne(`http://localhost:3000/api/tickets/event/${eventId}`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedTickets);
    });

    it('should handle errors', () => {
      const eventId = 1;
      const errorMessage = 'Error fetching tickets';

      service.getTicketsByEvent(eventId).subscribe(
        () => fail('Expected an error, not tickets'),
        error => {
          expect(error.error).toContain(errorMessage);
        }
      );

      const req = httpTestingController.expectOne(`http://localhost:3000/api/tickets/event/${eventId}`);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('#bookTicket', () => {
    it('should book a ticket and return success message', () => {
      const userId = 1;
      const ticketId = 2;
      const bookingData = { userID: userId, ticketID: ticketId };
      const expectedResponse = { message: 'Booking successful' };

      service.bookTicket(userId, ticketId).subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });

      const req = httpTestingController.expectOne(service['bookingsUrl']);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(bookingData);
      req.flush(expectedResponse);
    });

    it('should handle errors when booking a ticket', () => {
      const userId = 1;
      const ticketId = 2;
      const bookingData = { userID: userId, ticketID: ticketId };
      const errorMessage = 'Error booking ticket';

      service.bookTicket(userId, ticketId).subscribe(
        () => fail('Expected an error, not success'),
        error => {
          expect(error.error).toContain(errorMessage);
        }
      );

      const req = httpTestingController.expectOne(service['bookingsUrl']);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(bookingData);
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });
});
