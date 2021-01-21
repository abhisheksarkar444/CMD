import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { Reason } from '../dataTypes/Reason';
import { Question } from '../dataTypes/Question';
import { QuestionCategory } from '../dataTypes/category';
import { Appointment } from '../dataTypes/Appointment';
import { Patient } from 'src/app/dashboard/models/patient';
import { UrlService } from 'src/app/shared/services/url.service'
import { AuthService } from 'src/app/shared/services/AuthService';

@Injectable({
  providedIn: "root"
})
export class AppointmentService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  appointment: Array<Appointment> = [];


  constructor(private http: HttpClient, private urls: UrlService, private authService: AuthService) { }

  private apiUrl = `${this.urls.teleAppointmentLocalApi}api/`;


  getAllReasons(): Observable<Reason[]> {
    let Url = this.apiUrl + 'reasons/allreasons';
    return this.http.get<Reason[]>(Url, this.httpOptions);
  }
  getAllQuestions(): Observable<Question[]> {
    let Url = this.apiUrl + 'Question/Get';
    return this.http.get<Question[]>(Url, this.httpOptions);
  }

  getAllCategories(): Observable<QuestionCategory[]> {
    let Url = this.apiUrl + 'Question/GetAllCategories';
    return this.http.get<QuestionCategory[]>(Url, this.httpOptions);
  }

  getQuestionsByCategory(catId: number): Observable<Question[]> {
    let Url = this.apiUrl + `Question/GetQuestionsByCategoryId?id=${catId}`;
    return this.http.get<Question[]>(Url, this.httpOptions);
  }

  getSchedulesByKeyAndDay(providerKey: string, day: string): Observable<any[]> {
    let Url = `${this.urls.profileLocalApi}` + `api/PhysicianSchedule/GetByKeyAndDay/ByKeyAndDay/${providerKey}/${day}`;
    return this.http.get<any[]>(Url, this.httpOptions);
  }


  getAppointmentsByProviderKeyAndDate(providerKey: string, date: string): Observable<Appointment> {
    let Url = this.apiUrl + `Appointment/GetAppointmentByProviderKeyAndDate/${providerKey}/${date}`;
    return this.http.get<Appointment>(Url, this.httpOptions);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    let Url = this.apiUrl + `Appointment/GetAppointmentById/${id}`;
    return this.http.get<Appointment>(Url, this.httpOptions);
  }

  getAppointments(): Observable<Appointment[]> {
    let url = this.apiUrl + "Appointment/GetLists";
    return this.http.get<Appointment[]>(url, this.httpOptions).pipe(tap(() => console.log('O Backend is working fine!!')));
  }

  addAppointment(appointment: Appointment): Observable<number> {
    let url = this.apiUrl + "Appointment/Post";
    return this.http.post<number>(url, appointment, this.httpOptions).pipe(tap(() => console.log("post service")));

  }

  getAppointmentbystatus(status: string): Observable<Appointment[]> {
    let url = this.apiUrl + `Appointment/GetAppointmentByStatus/${status}`;
    return this.http.get<Appointment[]>(url, this.httpOptions).pipe(tap(() => console.log("get qs by cat")))
  }

  updateAppointment(id, option, modifiedBy, modifiedtime) {
    return this.http.put(`https://cmdappointmentapi.azurewebsites.net/api/Appointment/UpdateAppointment?id=${id}&option=${option}&modifiedBy=${modifiedBy}&modifiedtime=${modifiedtime}`, {}, this.httpOptions);

  }
  public getAppointmentByRequestedStatus(id: number, status: string): Observable<Appointment[]> {
    const url = `${this.urls.profileLocalApi}` + `requested?providerUniquekey=${id}&Appointment_Status=${status}`;
    return this.http.get<Appointment[]>(url, this.httpOptions)
      .pipe(tap(() => console.log("Backend working fine "))
      );
  }
  public getAllAppointmentsByStatus(status: string): Observable<Appointment[]> {
    const url = this.apiUrl + `Appointment/GetAppointmentByStatus/${status}`;

    return this.http.get<Appointment[]>(url, this.httpOptions)
      .pipe(tap(() => console.log("Backend working fine "))
      );
  }

  scheduleService(id: string): Observable<import('../model/appointment.model').Appointment[]> {

    const url = `http://172.30.11.7:8320/api/Appointment/GetAllAppointmentByProviderUniqueKey/${id}`;
    return this.http.get<import('../model/appointment.model').Appointment[]>(url, this.httpOptions)
      .pipe(tap(() => console.log("Backend working fine "))
      );
  }
  //By this function we are fetching the patient image from patient table using the api service
  public getPatientImageByUniqueKey(patientUniqueKey: string): Observable<Patient> {
    const url = `${this.urls.profileLocalApi}api/Patient/GetPatientByUniqueKey?patientUniqueKey=${patientUniqueKey}`;
    return this.http.get<Patient>(url, this.httpOptions).pipe(tap(() => { console.log("patient Backend is working fine") }));
  }

  calenderService(status: number, id: string): Observable<import('../model/appointment.model').Appointment[]> {

    const url = `http://172.30.11.7:8320/api/Appointment/GetAppointmentByStatusAndProviderUniqueKey/${status}/${id}`;
    return this.http.get<import('../model/appointment.model').Appointment[]>(url, this.httpOptions)
      .pipe(tap(() => console.log("Backend working fine "))
      );
  }

}