import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Appointment } from "../models/appointment.model";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Biscuit } from "../models/biscuit.model";
import { Patient } from '../models/patient';
import { DashboardUrls } from '../shared/dashboard-urls';
import { AuthService } from 'src/app/shared/services/AuthService';
import { UrlService } from 'src/app/shared/services/url.service';
@Injectable({
  providedIn: "root"
})
export class AppointmentDetailService {
  appointmentsDate: number;
  date: string;
  status: string;
  biscuit: Biscuit;
  statusobj: string;

  constructor(private http: HttpClient, private urls: UrlService, private dashUrls: DashboardUrls, private auth: AuthService) { }


  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
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

  //This function is fetching all the Appointments on the basis of Provider unique key
  public getAppointmentByProviderUniqueKey(
    id: string
  ): Observable<Appointment[]> {
    const url = `${this.urls.teleAppointmentLocalApi}` + `${this.dashUrls.getAppointmentsByProviderUniqueKey}` + `${id}`;
    return this.http.get<Appointment[]>(url, this.httpHeaders).pipe(tap(() => { }));
  }


  //This function is used to update the status of the appointment if the status is in requested state
  //The Physician can either approve or deny the requested appointment
  public updateAppointmentStatusById(id: string, status: string): Observable<any> {
    const url = `${this.urls.teleAppointmentLocalApi}` + `api/Appointment/UpdateStatus/${id}/${status}`;
    return this.http.put(url, this.httpHeaders, { responseType: 'text' });
  }

  //By this function we are fetching the patient image from patient table using the api service
  public getPatientImage(patientUniqueKey: string): Observable<Patient> {
    const url = `${this.urls.profileLocalApi}` + `${this.dashUrls.getPatientByUniqueId}` + `${patientUniqueKey}`;
    return this.http.get<Patient>(url, this.httpHeaders).pipe(tap(() => { }));
  }

  //This function is used for displaying the total appointments of a particular doctor
  public getTotalAppointments() {
    let appoint: Appointment[] = [];
    return new Promise(resolve => {
      this.getAppointmentByProviderUniqueKey(this.auth.getuserUniqueId()).subscribe(
        (x: Appointment[]) => {
          resolve(x);
          appoint = x;
        });
    });
  }

  //This function is used to fetch the upcoming, todays and previous appointment of a Doctor
  //In this function we have used slice to take date from the datetime value in order to match it with the todays date
  public getAppointmentByDate(num: number, appointment: Appointment[]) {
    let appoint: Appointment[] = [];
    if (num == 0) {
      appointment.forEach(element => {
        if (element.startTime.slice(0, 10) == this.getAppointmentDate()
          && (element.appointment_Status == "Approved" || element.appointment_Status == "Requested" || element.appointment_Status == "Closed")) {
          appoint.push(element);
        }
      });
    } else if (num == 1) {
      appointment.forEach(element => {
        if (element.startTime.slice(0, 10) > this.getAppointmentDate()
          && (element.appointment_Status == "Approved" || element.appointment_Status == "Requested" || element.appointment_Status == "Closed")) {
          appoint.push(element);
        }
      });
    } else if (num == -1) {
      appointment.forEach(element => {
        if (element.startTime.slice(0, 10) < this.getAppointmentDate()
          && (element.appointment_Status == "Approved" || element.appointment_Status == "Requested" || element.appointment_Status == "Closed")) {
          appoint.push(element);
        }
      });
    }
    return appoint;
  }

  //This function is used for displaying the urgent appointments of a particular doctor
  public getUrgentAppointment(appointment: Appointment[]) {
    let appoint: Appointment[] = [];
    appointment.forEach((x: Appointment) => {
      if (x.appointment_Priority == "Urgent") {
        appoint.push(x);
      }
    });
    return appoint;
  }

  //This function is used for displaying the cancelled appointments of a particular doctor
  public getCancelledAppointment(appointment: Appointment[]) {
    let appoint: Appointment[] = [];
    appointment.forEach((x: Appointment) => {
      if (x.appointment_Status == "Canceled" && x.startTime.slice(0, 10) == this.getAppointmentDate()) {
        appoint.push(x);
      }
    });
    return appoint;
  }
}
