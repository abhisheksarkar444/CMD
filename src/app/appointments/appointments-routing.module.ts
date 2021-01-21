import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { NewappointmentComponent } from "../appointments/newappointment/newappointment.component";
import { ClinicselectionsComponent } from "./newappointment/clinicselections/clinicselections.component";
import { DoctorselectionsComponent } from "../appointments/newappointment/doctorselections/doctorselections.component";
import { AppointmentconfirmationComponent } from "../appointments/appointmentconfirmation/appointmentconfirmation.component";
import { AppointmentGridViewComponent } from "../appointments/appointment-grid-view/appointment-grid-view.component";
import { NewappointmentScheduleComponent } from './newappointment/newappointment-schedule/newappointment-schedule.component';
import { AppointmentDetailsListComponent } from './appointment-details-list/appointment-details-list.component';

const routes: Routes = [
  { path: "newAppointments", component: NewappointmentComponent },
  { path: "selectClinic", component: ClinicselectionsComponent },
  { path: "selectDoctor", component: DoctorselectionsComponent },
  { path: "appointementConfirmaton/:id", component: AppointmentconfirmationComponent },
  { path: "appointmenthistory", component: NewappointmentScheduleComponent },
  { path: 'appointmentlist', component: AppointmentDetailsListComponent },
  { path: "appointmentgridview", component: AppointmentGridViewComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApointmentsRoutingModule { }
