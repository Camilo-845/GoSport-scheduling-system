import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnventsComponent } from './envents.component';

describe('EnventsComponent', () => {
  let component: EnventsComponent;
  let fixture: ComponentFixture<EnventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
