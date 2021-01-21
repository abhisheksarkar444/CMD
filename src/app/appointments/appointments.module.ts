import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule, MatInputModule, MatFormFieldModule, MatStepperModule } from "@angular/material";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import { ApointmentsRoutingModule } from './appointments-routing.module';
import { NewappointmentComponent } from './newappointment/newappointment.component';
import { ClinicselectionsComponent } from './newappointment/clinicselections/clinicselections.component';
import { DoctorselectionsComponent } from './newappointment/doctorselections/doctorselections.component';
import { QuizComponent } from './newappointment/quiz/quiz.component';
import { AppointmentconfirmationComponent } from './appointmentconfirmation/appointmentconfirmation.component';
import { PatientappointmentStepperComponent } from './newappointment/Appointment-stepper/patientappointment-stepper.component';
import { PatientAppointmentstep1Component } from './newappointment/Appointment-stepper/newappointmentstep1/newappointmentstep1.component';
import { PatientAppointmentstep2Component } from './newappointment/Appointment-stepper/newappointmentstep2/newappointmentstep2.component';
import { PatientAppointmentstep3Component } from './newappointment/Appointment-stepper/newappointmentstep3/newappointmentstep3.component';
import { AppointmentDetailsListComponent } from './appointment-details-list/appointment-details-list.component';
import { AppointmentGridViewComponent } from './appointment-grid-view/appointment-grid-view.component';
import { CalendarHeaderComponent } from './appointment-grid-view/types/calendar-header.component';
import { SharedModule } from '../shared';
import { AppointmentUtil } from './utility/appointment.utility';



@NgModule({
  declarations: [
    NewappointmentComponent,
    ClinicselectionsComponent,
    DoctorselectionsComponent,
    QuizComponent,
    AppointmentconfirmationComponent,
    PatientappointmentStepperComponent,
    PatientAppointmentstep1Component,
    PatientAppointmentstep2Component,
    PatientAppointmentstep3Component,

    AppointmentGridViewComponent,
    AppointmentDetailsListComponent,
    CalendarHeaderComponent
  ],

  imports: [
    CommonModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCardModule,
    AppointmentUtil,

    ApointmentsRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModalModule,
    SharedModule
  ],

  exports: [MatSelectModule, MatInputModule, MatFormFieldModule, SharedModule]
})
export class AppointmentsModule { }
