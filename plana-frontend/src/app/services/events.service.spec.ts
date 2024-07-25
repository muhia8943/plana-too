import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;
  let httpTestingController: HttpTestingController;

  const mockEvent = {
    EventID: 1,
    Title: 'Event Title',
    Category: 'Event Category',
    Description: 'Event Description',
    Date: '2023-07-25T10:00:00.000Z',
    Time: '2023-07-25T10:00:00.000Z',
    Location: 'Event Location',
    Price: 100,
    EventImage: 'http://example.com/image.jpg'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventsService]
    });

    service = TestBed.inject(EventsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all events', () => {
    service.getAllEvents().subscribe(events => {
      expect(events).toEqual([mockEvent]);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/events');
    expect(req.request.method).toBe('GET');
    req.flush([mockEvent]); // Respond with mock data
  });

  it('should get event by id', () => {
    const eventId = 1;

    service.getEventById(eventId).subscribe(event => {
      expect(event).toEqual(mockEvent);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/api/events/${eventId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEvent); // Respond with mock data
  });

  it('should create an event', () => {
    service.createEvent(mockEvent).subscribe(response => {
      expect(response).toEqual(mockEvent);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/events');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockEvent);
    req.flush(mockEvent); // Respond with mock data
  });

  it('should update an event', () => {
    const eventId = 1;

    service.updateEvent(eventId, mockEvent).subscribe(response => {
      expect(response).toEqual(mockEvent);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/api/events/${eventId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockEvent);
    req.flush(mockEvent); // Respond with mock data
  });

  it('should delete an event', () => {
    const eventId = 1;

    service.deleteEvent(eventId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/api/events/${eventId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}); // Respond with mock data
  });
});
