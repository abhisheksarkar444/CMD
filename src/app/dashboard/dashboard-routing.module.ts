import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { AppointmentCardComponent } from './shared/appointment-card/appointment-card.component';
import { NewappointmentComponent } from '../appointments/newappointment/newappointment.component';

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "appointmentCard/:id",
    component: AppointmentCardComponent
  },
  {
    path: "newAppointments",
    component: NewappointmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
