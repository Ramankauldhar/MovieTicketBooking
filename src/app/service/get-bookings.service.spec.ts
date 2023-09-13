import { TestBed } from '@angular/core/testing';

import { GetBookingsService } from './get-bookings.service';

describe('GetBookingsService', () => {
  let service: GetBookingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBookingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
