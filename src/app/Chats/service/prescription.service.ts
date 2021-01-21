import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Medicine } from '../dataTypes/Medicine';
import { Prescription } from '../dataTypes/Prescription';
import { Appointment } from 'src/app/appointments/dataTypes/Appointment';
import { UrlService } from 'src/app/shared/services/url.service';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  medicines: Medicine[] = [];
  pres: Prescription[] = [];

  url: UrlService;
  constructor(private http: HttpClient) {
    this.url = new UrlService();
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('currentUser')).id_token

    })
  };
  public AddPrescriptionByPatientUniqueId(id: string, prescriptionObj: Prescription): Observable<Prescription> {
    const url = `${this.url.teleAppointmentLocalApi}` + `api/Prescription/AddPrescriptionByPatientUniqueId/${id}`;
    return this.http.post<Prescription>(url, prescriptionObj, this.httpOptions)
      .pipe(
        tap(() => console.log())
      );
  }
  public getAppointmentsByPatientUniqueKey(key: string): Observable<Appointment[]> {
    const url = `${this.url.teleAppointmentLocalApi}` + `api/Appointment/GetAllAPpointmentsByPatientUniqueKey/${key}`;
    return this.http.get<Appointment[]>(url, this.httpOptions).pipe(tap(() => console.log()));
  }
  public getReasonsByAppointmemtId(id: number): Observable<string[]> {
    const url = `${this.url.teleAppointmentLocalApi}` + `api/Reasons/${id}`;
    return this.http.get<string[]>(url, this.httpOptions).pipe(tap(() => console.log('get Reason is working fine')));
  }
  public getAppointmentsByProviderAndPatientKeyAndStatus(status: number, providerKey: string, patientKey: string) {
    const url = `${this.url.teleAppointmentLocalApi}` + `api/Appointment/GetAppointmentByStatusAndBothKeys/${status}/${providerKey}/${patientKey}`;
    return this.http.get<Appointment[]>(url, this.httpOptions).pipe(tap(() => console.log()));
  }
  public AddPrescriptionByAppointmentId(id: number, prescriptionObj: Prescription) {
    const url = `${this.url.teleAppointmentLocalApi}` + `api/Prescription/AddPrescriptionByAppointmentId/${id}`;
    return this.http.post<Prescription>(url, prescriptionObj, this.httpOptions)
      .pipe(
        tap(() => console.log())
      );
  }

  public getPrescriptionByAppointmentID(id: number): Observable<any> {
    const url = `${this.url.teleAppointmentLocalApi}` + `api/Prescription/GetPrescriptionsByAppointmentId?id=${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(tap());
  }



}
