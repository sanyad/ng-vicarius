import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademinCalendarComponent } from './academin-calendar.component';

describe('AcademinCalendarComponent', () => {
  let component: AcademinCalendarComponent;
  let fixture: ComponentFixture<AcademinCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademinCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademinCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
