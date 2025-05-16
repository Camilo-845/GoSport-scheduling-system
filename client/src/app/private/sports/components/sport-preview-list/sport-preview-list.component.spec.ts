import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportPreviewListComponent } from './sport-preview-list.component';

describe('SportPreviewListComponent', () => {
  let component: SportPreviewListComponent;
  let fixture: ComponentFixture<SportPreviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportPreviewListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportPreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
