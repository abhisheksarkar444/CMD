import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PatientappointmentStepperComponent } from '../patientappointment-stepper.component';
import { Reason } from '../../../dataTypes/Reason';
import { Appointment } from 'src/app/appointments/dataTypes/Appointment';
import { AppointmentService } from 'src/app/appointments/service/appointment.service';
import { QuestionCategory } from '../../../dataTypes/category';
import { Reason_Category } from 'src/app/appointments/dataTypes/Reason_Category';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'kkd-patientappointmentstep2',
  templateUrl: './newappointmentstep2.component.html',
  styleUrls: ['./newappointmentstep2.component.css']
})
export class PatientAppointmentstep2Component implements OnInit {

  @Input() parent: PatientappointmentStepperComponent;
  @Input() Appointment: Appointment;
  @Output() AppointmentChange = new EventEmitter();
  @Input() catId: number;
  @Output() catIdChange = new EventEmitter();
  reasonForm = new FormGroup({
    reasonDescription: new FormControl('', [Validators.required, Validators.minLength(10)])
  })
  QuestionCategories: QuestionCategory[] = [];
  Reason: Reason = new Reason();
  reasonDescription: string;
  proceed: boolean;
  isCategorySelected: boolean;
  patientIssues: Reason[] = [];
  SelectedIssuesID: number[] = [];
  SelectedIssues: string[] = [];
  SelectedReason: Reason[] = [];

  constructor(private service: AppointmentService) { }

  ngOnInit() {
    this.proceed = false;
    this.isCategorySelected = false;
    this.service.getAllCategories().subscribe(cat => {
      this.QuestionCategories = cat;
    });
  }

  onKey(event) {
    this.proceed = this.isCategorySelected && this.reasonForm.status == "VALID";
  }

  selectedCategory(ID: number) {
    this.catId = ID;
    this.catIdChange.emit(this.catId);
    this.isCategorySelected = true;
    this.proceed = this.isCategorySelected && this.reasonForm.status == "VALID";
  }

  SetReason() {
    this.Reason.reasonCategoryOption = Reason_Category.Booking_Reason;
    this.Reason.description = this.reasonForm.value.reasonDescription;
    this.Appointment.reasons.push(this.Reason);
  }
}