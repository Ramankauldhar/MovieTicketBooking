import { TestBed } from '@angular/core/testing';

import { BookTicketService } from './book-ticket.service';

describe('BookTicketService', () => {
  let service: BookTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
