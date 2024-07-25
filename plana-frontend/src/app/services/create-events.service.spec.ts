import { TestBed } from '@angular/core/testing';

import { CreateEventsService } from './create-events.service';

describe('CreateEventsService', () => {
  let service: CreateEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
