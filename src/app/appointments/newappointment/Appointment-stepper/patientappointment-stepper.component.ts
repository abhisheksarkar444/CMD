import { Component, OnInit, Input } from '@angular/core';
import { Appointment } from '../../dataTypes/Appointment';

@Component({
  selector: 'kkd-patientappointment-stepper',
  templateUrl: './patientappointment-stepper.component.html',
  styleUrls: ['./patientappointment-stepper.component.css']
})
export class PatientappointmentStepperComponent implements OnInit {
  step1_show: boolean = true;
  step2_show: boolean = false;
  step3_show: boolean = false;
  step4_show: boolean = false;
  catId: number;

  @Input() Appointment: Appointment;

  constructor() { }

  ngOnInit() {

  }

  Do() {

  }
  stepsClick(va: string) {
    console.log(va);
  }
}

