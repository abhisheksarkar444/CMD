import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoomRoutingModule } from './chat-room-routing.module';
import { ChatLandingPageComponent } from '../Chats/chat-landing-page/chat-landing-page.component';
import { ChatHistoryComponent } from '../Chats/chat-history/chat-history.component';
import { GoogleSignInComponent } from 'angular-google-signin';
import { VitalsComponent } from './vitals/vitals.component';


import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatDividerModule } from '@angular/material';
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { PrescriptionComponent } from '../Chats/prescription/prescription.component';
import { AddMedicineComponent } from '../Chats/prescription/AddMedicine/add-medicine.component';
import { MedicineListComponent } from '../Chats/prescription/MedicineList/medicine-list.component';
import { MaterialJsModule } from '../materialjs.module';
import { SharedModule } from '../shared';
import { BarChartComponent } from './vitals/bar-chart/bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FileAttachService } from '../Chats/service/fileattachService';
import { TextMessageComponent } from '../Chats/text-messages/text-message.component';
import { MedicineMessageComponent } from '../Chats/text-messages/medicine-message.component';
import { PrescriptionSucccessMessageComponent } from '../Chats/text-messages/prescription-succcess-message.component';

@NgModule({
  declarations: [
    ChatLandingPageComponent,
    ChatHistoryComponent,
    VitalsComponent,
    PrescriptionComponent,
    AddMedicineComponent,
    MedicineListComponent,
    BarChartComponent,
    TextMessageComponent,
    MedicineMessageComponent,
    PrescriptionSucccessMessageComponent


  ],
  imports: [
    CommonModule,
    ChatRoomRoutingModule,
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
    MatDividerModule,
    MaterialJsModule,
    SharedModule,
    NgxChartsModule,

  ],
  exports: [MatSelectModule, MatInputModule, MatFormFieldModule],
  entryComponents: [TextMessageComponent, MedicineMessageComponent, PrescriptionSucccessMessageComponent]

})
export class ChatRoomModule { }
