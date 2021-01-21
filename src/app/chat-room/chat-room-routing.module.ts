import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatLandingPageComponent } from '../Chats/chat-landing-page/chat-landing-page.component';
import { VitalsComponent } from './vitals/vitals.component';
import { AddMedicineComponent } from '../Chats/prescription/AddMedicine/add-medicine.component';
import { MedicineListComponent } from '../Chats/prescription/MedicineList/medicine-list.component';
import { PrescriptionComponent } from '../Chats/prescription/prescription.component';

const routes: Routes = [
  {
    path: 'vitals/',
    component: VitalsComponent
  },
  {
    path: 'chat',
    component: ChatLandingPageComponent,
    pathMatch: 'full'
  },
  { path: 'addmed/:childid', component: AddMedicineComponent },
  { path: 'medlist', component: MedicineListComponent },
  { path: 'prescription/:id', component: PrescriptionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoomRoutingModule { }
