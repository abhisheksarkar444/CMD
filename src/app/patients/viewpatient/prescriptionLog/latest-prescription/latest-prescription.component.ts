import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/AuthService';
import { UrlService } from '../../../../shared/services/url.service';

@Component({
  selector: 'kkd-latest-prescription',
  templateUrl: './latest-prescription.component.html',
  styleUrls: ['./latest-prescription.component.css']
})
export class LatestPrescriptionComponent implements OnInit {

  @Input() patientUniqueKey;
  medicines = [];

  constructor(
    private http: HttpClient,
    private urls: UrlService,
    private authSvc: AuthService,
  ) { }

  ngOnInit() {

    let httpHeaders = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': this.authSvc.authorizationHeaderValue
      })
    };
    this.http.get(`${this.urls.teleAppointmentLocalApi}api/Appointment/GetLatestAppointmentsHavingPrescriptionByPatientUniqueKey/${this.patientUniqueKey}`, httpHeaders)
      .subscribe(appointment => {
        (appointment["prescriptions"] as []).forEach(prescription => {
          (prescription["medicines"] as []).forEach(medicine => {
            this.medicines.push(medicine);
          });
        });
      });

  }

}
