import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingByIdComponent } from './booking-by-id.component';

describe('BookingByIdComponent', () => {
  let component: BookingByIdComponent;
  let fixture: ComponentFixture<BookingByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
