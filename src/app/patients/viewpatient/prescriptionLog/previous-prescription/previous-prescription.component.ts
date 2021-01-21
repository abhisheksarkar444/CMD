import { Component, OnInit, Input, ApplicationRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/AuthService';
import { UrlService } from '../../../../shared/services/url.service';
import { Appointment } from 'src/app/appointments/dataTypes/Appointment';

@Component({
  selector: 'kkd-previous-prescription',
  templateUrl: './previous-prescription.component.html',
  styleUrls: ['./previous-prescription.component.css']
})
export class PreviousPrescriptionComponent implements OnInit {

  @Input() patientUniqueKey;
  appointments: Appointment[] = [];

  constructor(
    private http: HttpClient,
    private urls: UrlService,
    private authSvc: AuthService,
    private appref: ApplicationRef
  ) { }

  ngOnInit() {
    let httpHeaders = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': this.authSvc.authorizationHeaderValue
      })
    };
    this.http.get(`${this.urls.teleAppointmentLocalApi}api/Appointment/GetAllPreviousAppointmentsHavingPrescriptionByPatientUniqueKey/${this.patientUniqueKey}`, httpHeaders)
      .subscribe((appointments: Appointment[]) => {
        appointments.forEach(appointment => {
          this.appointments.push(appointment);
        });
      });
  }

}
