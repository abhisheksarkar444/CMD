import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './theme';
import { SchedulepatientdetailsComponent } from '../appointments/newappointment/newappointment-schedule/schedulepatientdetails/schedulepatientdetails.component';
import { NewappointmentScheduleComponent } from '../appointments/newappointment/newappointment-schedule/newappointment-schedule.component';
import { SplitPipe } from './pipes/CustomPipes';


@NgModule({
  declarations: [
    SchedulepatientdetailsComponent,
    NewappointmentScheduleComponent,
    SplitPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    SchedulepatientdetailsComponent,
    NewappointmentScheduleComponent
  ]
})
export class SharedModule { }
