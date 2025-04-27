import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsGridComponent } from './sports-grid.component';

describe('SportsGridComponent', () => {
  let component: SportsGridComponent;
  let fixture: ComponentFixture<SportsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
