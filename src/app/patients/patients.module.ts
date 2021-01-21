import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientslistComponent } from './patientslist/patientslist.component';
import { ViewpatientComponent } from './viewpatient/viewpatient.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatNativeDateModule, MatGridListModule, MatIconModule, MatListModule, MatFormFieldModule, MatExpansionModule, MatInputModule, MatAutocompleteModule, MatChipsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SymptomsComponent } from './viewpatient/symptoms/symptoms.component';
import { PrescriptionComponent } from './viewpatient/prescription/prescription.component';
import { AppointmentHistoryComponent } from './viewpatient/appointmentHistory/appointment-history.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterlistPipe } from './Common/filterlist.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { PrescriptionLogComponent } from './viewpatient/prescriptionLog/prescription-log.component';
import { LatestPrescriptionComponent } from './viewpatient/prescriptionLog/latest-prescription/latest-prescription.component';
import { PreviousPrescriptionComponent } from './viewpatient/prescriptionLog/previous-prescription/previous-prescription.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [PatientslistComponent, ViewpatientComponent, FilterlistPipe, SymptomsComponent, PrescriptionComponent, AppointmentHistoryComponent, PrescriptionLogComponent, LatestPrescriptionComponent, PreviousPrescriptionComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    Ng2SearchPipeModule,
    MatTabsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatChipsModule,
    NgxPaginationModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  exports: [MatCardModule, MatProgressBarModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, Ng2SearchPipeModule, MatGridListModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule]
})
export class PatientsModule { }