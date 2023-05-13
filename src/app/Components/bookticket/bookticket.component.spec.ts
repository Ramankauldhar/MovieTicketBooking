import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookticketComponent } from './bookticket.component';

describe('BookticketComponent', () => {
  let component: BookticketComponent;
  let fixture: ComponentFixture<BookticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookticketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
