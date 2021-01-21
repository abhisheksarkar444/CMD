import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators'
import { DashboardUrls } from '../shared/dashboard-urls';
import { AuthService } from 'src/app/shared/services/AuthService';
import { Appointment } from '../models/appointment.model';
import { Physician } from '../models/physician.model';
import { Prescription } from '../models/Prescription.model';
import { UrlService } from 'src/app/shared/services/url.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient, private urls: UrlService, private dashUrls: DashboardUrls, private auth: AuthService) { }

  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.auth.authorizationHeaderValue
    })
  };
  //This function is helping in getting todays date in the required format "yyyy-mm-dd"
  public getAppointmentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let date = dd < 10 ? "0" + dd : dd;
    let month = mm < 10 ? "0" + mm : mm;
    return yyyy + "-" + month + "-" + date;
  }

  //This function is fetching all the Appointments on the basis of Patient unique key
  public getAppointmentByPatientUniqueKey(
    patientuniquekey: string
  ): Observable<Appointment[]> {
    const url = `${this.urls.teleAppointmentLocalApi}` + `${this.dashUrls.getAppointmentsByPatientUniqueKey}` + `${patientuniquekey}`;
    return this.http.get<Appointment[]>(url, this.httpHeaders).pipe(tap(() => { }));
  }

  public getPhysicianImage(provideruniquekey: string): Observable<Physician> {
    const url = `${this.urls.profileLocalApi}` + `${this.dashUrls.getPhysicianById}` + `${provideruniquekey}`;
    return this.http.get<Physician>(url, this.httpHeaders).pipe(tap(() => { }));
  }

  //This function is used for displaying the total appointments of a particular Patient
  public getTotalAppointments() {
    let appoint: Appointment[] = [];
    return new Promise(resolve => {
      this.getAppointmentByPatientUniqueKey(this.auth.getuserUniqueId()).subscribe(
        (x: Appointment[]) => {
          resolve(x);
          appoint = x;
        });
    });
  }

  public getPrescriptions(appoint: Appointment[]) {
    let prescription: Prescription[] = [];
    let dummy: Prescription[] = [];
    appoint.forEach(x => {
      dummy = x.prescriptions;
      for (let index = 0; index < dummy.length; index++) {
        dummy[index].name = x.providerFirstName.concat(" ").concat(x.providerLastName);
      }
      prescription = prescription.concat(dummy);
    });
    return prescription;
  }
}
