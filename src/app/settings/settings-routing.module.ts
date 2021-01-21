import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { GenericQuestionsComponent } from './generic-questions/generic-questions.component';
import { ProfileInfoComponent } from '../account-settings/profile-info.component';
import { AvailabilityComponent } from '../availability/availability.component';

const routes: Routes = [
  {
    path: "settings",
    component: SettingsComponent,
    children: [
      {
        path: "generic-questions",
        component: GenericQuestionsComponent
      },
      {
        path: "account-settings",
        component: ProfileInfoComponent
      },
      {
        path: "availability-settings",
        component: AvailabilityComponent
      },
      // {
      //   path: "unavailabilty-questions",
      //   component: null
      // }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
