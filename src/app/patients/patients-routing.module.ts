import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientslistComponent } from './patientslist/patientslist.component'
import { ViewpatientComponent } from './viewpatient/viewpatient.component';
import { PrescriptionComponent } from './viewpatient/prescription/prescription.component';
import { AppointmentHistoryComponent } from './viewpatient/appointmentHistory/appointment-history.component';
import { PrescriptionLogComponent } from './viewpatient/prescriptionLog/prescription-log.component';
import { LatestPrescriptionComponent } from './viewpatient/prescriptionLog/latest-prescription/latest-prescription.component';
import { PreviousPrescriptionComponent } from './viewpatient/prescriptionLog/previous-prescription/previous-prescription.component';
const routes: Routes = [

  { path: 'viewpatient/:id', component: ViewpatientComponent },
  { path: 'ViewAllPatients', component: PatientslistComponent },
  { path: 'appointmentHistory', component: AppointmentHistoryComponent },
  { path: 'prescription/:Aid', component: PrescriptionComponent },
  { path: 'prescriptionLog', component: PrescriptionLogComponent },
  { path: 'latest/:key', component: LatestPrescriptionComponent },
  { path: 'history/:key', component: PreviousPrescriptionComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
