import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AngularMaterialModule } from "./angular-material.module";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { KeysPipe } from "./pipes/keys.pipe";

import { DashboardComponent } from "./dashboard.component";
import { AppointmentCardComponent } from "./shared/appointment-card/appointment-card.component";
import { NgxBarChartComponent } from "./pcp-dashboard/biscuit/ngx-bar-chart/ngx-bar-chart.component";
import { BiscuitComponent } from "./pcp-dashboard/biscuit/biscuit.component";
import { CommunicationComponent } from "./shared/communication/communication.component";
import { PatientDashboardComponent } from "./patient-dashboard/patient-dashboard.component";
import { PcpDashboardComponent } from "./pcp-dashboard/pcp-dashboard.component";
import { RequestCardComponent } from "./patient-dashboard/request-card/request-card.component";
import { PcpInfoCardComponent } from "./patient-dashboard/pcp-info-card/pcp-info-card.component";
import { PrescriptionsComponent } from "./patient-dashboard/prescriptions/prescriptions.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardUrls } from './shared/dashboard-urls';
import { PcpCardComponent } from './shared/pcp-card/pcp-card.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AppointmentCardComponent,
    NgxBarChartComponent,
    BiscuitComponent,
    CommunicationComponent,
    PatientDashboardComponent,
    PcpDashboardComponent,
    RequestCardComponent,
    PcpInfoCardComponent,
    PrescriptionsComponent,
    KeysPipe,
    PcpCardComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxChartsModule,
    DashboardRoutingModule,
    AngularMaterialModule,
    DashboardUrls,
    NgxPaginationModule
  ],
  exports: []
})

export class DashboardModule { }
