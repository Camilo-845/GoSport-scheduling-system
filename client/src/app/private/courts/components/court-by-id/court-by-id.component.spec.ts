import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtByIdComponent } from './court-by-id.component';

describe('CourtByIdComponent', () => {
  let component: CourtByIdComponent;
  let fixture: ComponentFixture<CourtByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
