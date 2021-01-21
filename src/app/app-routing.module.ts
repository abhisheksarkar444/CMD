import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { ChatLandingPageComponent } from './Chats/chat-landing-page/chat-landing-page.component';
import { PatientslistComponent } from './patients/patientslist/patientslist.component';
import { ChatHistoryComponent } from './Chats/chat-history/chat-history.component';
import { ViewpatientComponent } from './patients/viewpatient/viewpatient.component';
import { ProfileInfoComponent } from './account-settings/profile-info.component';
import { AvailabilityComponent } from './availability/availability.component';
import { VitalsComponent } from './chat-room/vitals/vitals.component';
import { AppointmentGridViewComponent } from './appointments/appointment-grid-view/appointment-grid-view.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { HomeComponent } from './home/home.component';
import { AppointmentDetailsListComponent } from './appointments/appointment-details-list/appointment-details-list.component';
import { GenericQuestionsComponent } from './settings/generic-questions/generic-questions.component';
import { SettingsComponent } from './settings/settings.component';
import { NewappointmentComponent } from './appointments/newappointment/newappointment.component';
import { AppointmentconfirmationComponent } from './appointments/appointmentconfirmation/appointmentconfirmation.component';
import { ListComponent } from './Chats/list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LatestPrescriptionComponent } from './patients/viewpatient/prescriptionLog/latest-prescription/latest-prescription.component';
import { PreviousPrescriptionComponent } from './patients/viewpatient/prescriptionLog/previous-prescription/previous-prescription.component';


const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "ViewAllPatients", component: PatientslistComponent },
  { path: 'viewpatient/:id', component: ViewpatientComponent },
  { path: 'chat', component: ChatLandingPageComponent },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'chat-history', component: ChatHistoryComponent },
  { path: 'ChatLandingPageComponent', component: ChatLandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'availability', component: AvailabilityComponent },
  { path: 'vitals', component: VitalsComponent },
  { path: 'latest/:key', component: LatestPrescriptionComponent },
  { path: 'history/:key', component: PreviousPrescriptionComponent },
  { path: 'account-settings', component: ProfileInfoComponent },
  { path: 'appointmentgridview', component: AppointmentGridViewComponent },
  { path: "appointmentlist", component: AppointmentDetailsListComponent },
  { path: 'home', component: HomeComponent },
  { path: "generic-questions", component: GenericQuestionsComponent },
  { path: "availability-settings", component: AvailabilityComponent },
  {
    path: 'settings', component: SettingsComponent,
    children: [{
      path: 'account-settings', component: ProfileInfoComponent
    },
    {
      path: "generic-questions",
      component: GenericQuestionsComponent
    },
    {
      path: "availability-settings",
      component: AvailabilityComponent
    }, { path: '**', redirectTo: 'account-settings', pathMatch: 'full' }
    ]
  },
  { path: "newAppointments", component: NewappointmentComponent },
  { path: "appointementConfirmaton/:id", component: AppointmentconfirmationComponent },
  { path: 'Rating', component: ListComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'availability-settings', component: AvailabilityComponent },
  { path: 'generic-questions', component: GenericQuestionsComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
