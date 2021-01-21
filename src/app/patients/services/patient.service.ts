import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientListModule } from '../Common/patientList-module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/AuthService';
import { UrlService } from 'src/app/shared/services/url.service';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  prescription: any[];
  patientt: any;
  symptoms: any[];
  appId: any[];
  medicines: any[] = [];

  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient, private urls: UrlService, private authService: AuthService) { }

  //This Service is used to get the List of all Patients.
  public getAllPatients(): Observable<any[]> {
    const url = `${this.urls.profileLocalApi}` + `api/Patient/GetAllPatients`;
    console.log("the URl is " + url);
    return this.http.get<any[]>(url).pipe(tap());
  }

  //This Service is used to get the Patient by passing the PatientUniqueKey as parameter from Database

  public getPatientInfoById(uuidd: string): Observable<any> {
    const url = `${this.urls.profileLocalApi}` + `api/Patient/GetAllPatientsByUniqueMemberId/${uuidd}`;
    return this.http.get<any>(url, this.httpHeaders).pipe(tap());
  }

  //This Service is used to get Patient by passing the PatientID as parameter
  public getPatientById(id: number): Observable<any> {
    const url = `${this.urls.profileLocalApi}` + `api/Patient/GetPatientById/${id}`;
    return this.http.get<any>(url, this.httpHeaders).pipe(tap());
  }

  //This Service is used to get Patient by passing the name as parameter
  public getPatientByName(name: string): Observable<PatientListModule> {
    const url = `${this.urls.profileLocalApi}` + `api/Patient/GetPatientByName/${name}`;
    return this.http.get<PatientListModule>(url, this.httpHeaders).pipe(tap());
  }

  //This Service is used to get All the Prescriptions from Appointments by passing AppointmentID as parameter
  public getPrescriptionByAppointmentID(id: number): Observable<any> {
    const url = `${this.urls.teleAppointmentLocalApi}` + `api/Prescription/GetPrescriptionsByAppointmentId?id=${id}`;
    return this.http.get<any>(url, this.httpHeaders).pipe(tap());
  }

  public getPrescriptionByAppointmentId(id: any) {
    return new Promise(resolve => {
      this.getPrescriptionByAppointmentID(id).subscribe(
        (x: any) => {
          resolve(x);
          this.prescription = x;
        });
    });
  }

  //This Service is used to get all the Appointments of a particular patient by passing PatientId as parameter
  public getAppointmentsByPatientUniqueKey(patientUnique: any): Observable<any[]> {
    const url = `${this.urls.teleAppointmentLocalApi}` + `api/Appointment/GetAllAPpointmentsByPatientUniqueKey/${patientUnique}`;
    return this.http.get<any[]>(url, this.httpHeaders).pipe(tap());
  }

  //This Service is used to get all the Symptoms of that Particular Patient by passing PatientID as parameter 
  public getSymptomsByAppointmentID(Aid: any): Observable<any[]> {
    const url = `${this.urls.teleAppointmentLocalApi}` + `api/Reasons/GetReasonsByAppointmentId/${Aid}`;
    //const url = `http://localhost:60158/api/Reasons/GetReasonsByAppointmentId/${Aid}`;
    return this.http.get<any[]>(url, this.httpHeaders);
  }

  public getSymptomsByAppointmentId(Aid: any) {
    return new Promise(resolve => {
      this.getSymptomsByAppointmentID(Aid).subscribe(
        (y: any) => {
          resolve(y);
          this.symptoms = y;
        });
    });
  }

  //This service is used to get all the medicines from the Prescriptions by passing PrescriptionID as parameter
  public getMedicinesByPrescriptionId(Pid: any): Observable<any[]> {
    const url = `${this.urls.teleAppointmentLocalApi}` + `api/Prescription/GetMedicinesByPrescriptionId?id=${Pid}`;
    return this.http.get<any[]>(url, this.httpHeaders);
  }

  //This service is used to get all the Physicians
  public getAllPhysicians(): Observable<any[]> {
    //const url = `http://localhost:59639/api/Physician/GetAllPhysicians`;
    const url = `${this.urls.profileLocalApi}` + `api/Physician/GetAllPhysicians`;
    return this.http.get<any[]>(url, this.httpHeaders);
  }

  //This service is used to get the Provider by passing Provideruniquekey as parameter
  public getProviderByUniqueId(provideruniquekey): Observable<any> {
    const url = `${this.urls.profileLocalApi}` + `api/Physician/GetPhysicianById/${provideruniquekey}`;
    return this.http.get<any>(url, this.httpHeaders);
  }

  //This service is used to get the Patient by passing PatientUniqueKey as parameter
  public getPatientByUniqueId(patientUniqueKey): Observable<any> {
    const url = `${this.urls.profileLocalApi}` + `api/Patient/GetPatientByUniqueKey?patientUniqueKey=${patientUniqueKey}`;
    return this.http.get<any>(url, this.httpHeaders);
  }

  //This service is used to get all the Approved Appointments from the provider by passing Provideruniquekey as parameter
  public getApprovedAppointmentByProviderUniqueKey(provideruniquekey): Observable<any> {
    const url = `${this.urls.teleAppointmentLocalApi}` + `api/Appointment/GetApprovedAppointments/approved/${provideruniquekey}`;
    return this.http.get<any>(url, this.httpHeaders);
  }

  public getLatestAppointmentsPrescriptionByPatientUniqueKey(patientUniqueKey: string): Observable<any[]> {
    let httpHeaders = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': this.authService.authorizationHeaderValue
      })
    };
    return this.http.get<any[]>(`${this.urls.teleAppointmentLocalApi}api/Appointment/GetLatestAppointmentsHavingPrescriptionByPatientUniqueKey/${patientUniqueKey}`)

  }
}
