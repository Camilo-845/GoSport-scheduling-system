import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportByIdComponent } from './sport-by-id.component';

describe('SportByIdComponent', () => {
  let component: SportByIdComponent;
  let fixture: ComponentFixture<SportByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
