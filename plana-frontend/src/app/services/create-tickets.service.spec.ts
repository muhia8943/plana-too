import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateTicketsService } from './create-tickets.service';

describe('CreateTicketsService', () => {
  let service: CreateTicketsService;
  let httpTestingController: HttpTestingController;

  const mockTicket = {
    TicketID: 1,
    EventID: 100,
    TicketType: 'VIP',
    Price: 50
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CreateTicketsService]
    });

    service = TestBed.inject(CreateTicketsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a ticket', () => {
    service.createTicket(mockTicket).subscribe(response => {
      expect(response).toEqual(mockTicket);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/tickets');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockTicket);
    req.flush(mockTicket); // Respond with mock data
  });

  it('should get tickets by event', () => {
    const eventID = 100;
    const mockTickets = [mockTicket];

    service.getTicketsByEvent(eventID).subscribe(tickets => {
      expect(tickets).toEqual(mockTickets);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/api/tickets/event/${eventID}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTickets); // Respond with mock data
  });
});
