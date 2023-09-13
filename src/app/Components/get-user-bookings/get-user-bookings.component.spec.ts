import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserBookingsComponent } from './get-user-bookings.component';

describe('GetUserBookingsComponent', () => {
  let component: GetUserBookingsComponent;
  let fixture: ComponentFixture<GetUserBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetUserBookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetUserBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
