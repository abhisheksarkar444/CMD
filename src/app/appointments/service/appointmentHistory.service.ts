import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { Appointment } from 'src/app/appointments/dataTypes/Appointment';
import { UrlService } from 'src/app/shared/services/url.service';
@Injectable({
  providedIn: 'root'
})
export class AppointmentHistoryService {

  url: UrlService;
  httpOptionsForOurOwnServices =
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('currentUser')).id_token
      }),
    };
  constructor(private http: HttpClient) {
    this.url = new UrlService();
  }
  compapp: Appointment[] = [];
  public getAppmtsbystatusbypatient(patientKey: string, status: any): Observable<Appointment[]> {
    console.log("patient key " + patientKey);
    const url = `${this.url.teleAppointmentLocalApi}` + `api/Appointment/GetAppointmentsByStatusAndPatientKey/${status}/${patientKey}`;
    return this.http.get<Appointment[]>(url, this.httpOptionsForOurOwnServices).pipe(tap(() =>
      console.log("getting appointments by status and patient key")));
  }
  public getAppmtsbystatusbypatientandprovider(status: any, providerKey: string, patientKey: string): Observable<Appointment[]> {
    console.log("patient key " + patientKey);
    const url = `${this.url.teleAppointmentLocalApi}` + `api/Appointment/GetAppointmentByStatusAndBothKeys/${status}/${providerKey}/${patientKey}`;
    return this.http.get<Appointment[]>(url, this.httpOptionsForOurOwnServices).pipe(tap(() =>
      console.log("getting appointments by status and patient key")));
  }
  public getpendingAppmts(providerKey: string): Observable<Appointment[]> {
    const url = `${this.url.teleAppointmentLocalApi}` + `api/Appointment/GetRequestedAppointments/requested/${providerKey}`;
    return this.http.get<Appointment[]>(url, this.httpOptionsForOurOwnServices).pipe(tap(() =>
      console.log("getting pending appointments")));
  }
  public getreasonsforAppointment(appmtId: number): Observable<string[]> {
    const url = `${this.url.teleAppointmentLocalApi}` + `api/Reasons/${appmtId}`;
    return this.http.get<string[]>(url, this.httpOptionsForOurOwnServices).pipe(tap(() =>
      console.log("getting reasons for appointment")));
  }
  public getspecialityByProviderkey(providerKey: string): Observable<string[]> {
    const url = `${this.url.teleAppointmentLocalApi}` + `api/Appointment/GetSpecialityByProviderKey/${providerKey}`;
    return this.http.get<string[]>(url, this.httpOptionsForOurOwnServices).pipe(tap(() =>
      console.log("getting speciality")));
  }

  getAppointmentsByBothKeysAndStatus(status: number, providerKey: string, patientKey: string): Observable<Appointment[]> {

    const url = `${this.url.teleAppointmentLocalApi}` + `api/Appointment/GetAppointmentByStatusAndBothKeys/${status}/${providerKey}/${patientKey}`;
    return this.http.get<Appointment[]>(url, this.httpOptionsForOurOwnServices).pipe(tap(() =>
      console.log("getting appointments by both keys and status")));
  }
  public getAppmtsbystatusbyPatient(patientKey: string, status: any) {
    return new Promise(resolve => {
      this.getAppmtsbystatusbypatient(patientKey, status).subscribe((x: Appointment[]) => {
        resolve(x);
        this.compapp = x;
        console.log(this.compapp);
      })
    })
  }
  getAppointmentByBothKeysandstatusPromise(status: number, providerKey: string, patientKey: string) {
    return new Promise(resolve => {
      this.getAppointmentsByBothKeysAndStatus(status, providerKey, patientKey).subscribe((x: Appointment[]) => {
        resolve(x);
        this.compapp = x;
        console.log(this.compapp);
      })
    })
  }
}
