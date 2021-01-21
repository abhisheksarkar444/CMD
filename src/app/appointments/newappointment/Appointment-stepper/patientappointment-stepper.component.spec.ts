import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientappointmentStepperComponent } from './patientappointment-stepper.component';

describe('PatientappointmentStepperComponent', () => {
  let component: PatientappointmentStepperComponent;
  let fixture: ComponentFixture<PatientappointmentStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientappointmentStepperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientappointmentStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
