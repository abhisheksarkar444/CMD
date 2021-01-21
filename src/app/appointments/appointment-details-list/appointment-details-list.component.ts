import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { Notification } from 'src/app/notification/models/notification.model';
import { AuthService } from 'src/app/shared/services/AuthService';
import { Patient } from 'src/app/Chats/dataTypes/Patients.type';
import { Appointment } from '../model/appointment.model';
import { AppointmentDetailService } from 'src/app/dashboard/services/appointment-detail.service';
import { AppointmentUtil } from '../utility/appointment.utility';
import { NotificationType } from 'src/app/notification/models/notificationtype.model';


@Component({
  selector: 'kkd-appointment-details-list',
  templateUrl: './appointment-details-list.component.html',
  styleUrls: ['./appointment-details-list.component.css']
})


export class AppointmentDetailsListComponent implements OnInit {
  allAppointments: Appointment[];
  appointments: Appointment[];
  notification: Notification = new Notification();
  appointment: Appointment;
  currentStatus: string = "No Results Found";
  count: number = 0;
  patients: Patient[];
  NumberOfAppointments: number = 0;
  NumberOfApprovedAppt: number = 0;
  NumberOfRejectedAppt: number = 0;
  attributeDisabled = true;
  one = true;
  two = false;
  three = false;

  constructor(private service: AppointmentService, private notsrvc: NotificationService, private authService: AuthService, private ads: AppointmentDetailService, private date: AppointmentUtil) { }


  ngOnInit() {
    this.GetAllAppointments();
    this.GetAllApprovedAppointments();
    this.GetAllRejectedAppointments();
  }



  //get all the appointments for logged in for physician
  GetAllAppointments() {
    this.service.scheduleService(this.authService.getuserUniqueId()).subscribe(a => {
      this.appointments = a;
      this.allAppointments = a;
      this.NumberOfAppointments = this.GetAppointmetsByTodayDate();
      this.NumberOfApprovedAppt = this.GetAllApprovedAppointments();
      this.NumberOfRejectedAppt = this.GetAllRejectedAppointments();
      this.GetAppointmetsByTodayDate();

    });

  }

  //get all appointments by date
  GetAppointmetsByTodayDate(): number {
    let appts: Appointment[] = this.allAppointments;
    this.appointments = [];
    if (appts) {
      appts.forEach(a => {
        if (a.startTime.split('T')[0] == this.date.getTodaysDateTime().split(' ')[0]) {
          this.getPatientImage(a);
          this.appointments.push(a);
          this.count++;
        }

      });
    }
    this.NumberOfAppointments = this.appointments.length;
    console.log(this.appointments);
    return this.NumberOfAppointments;
  }

  //method-to get the patient-image from the database
  public getPatientImage(app: Appointment) {
    this.ads
      .getPatientImage(app.patientUniqueKey)
      .subscribe((p: Patient) => {
        app.patientImage = p.profilePhoto_Path;
      });
  }

  //get all the approved appointments for logged in physician
  GetAllApprovedAppointments() {

    let appts: Appointment[] = this.allAppointments;
    this.appointments = [];
    this.count = 0;
    if (appts) {
      appts.forEach(a => {
        if (a.startTime.split('T')[0] == this.date.getTodaysDateTime().split(' ')[0] && a.appointment_Status == "Approved") {
          this.appointments.push(a);
          this.count++;
        }
      })
    }
    this.NumberOfApprovedAppt = this.appointments.length;
    return this.NumberOfApprovedAppt;
  }

  //get all the rejected appointments for logged in physician
  GetAllRejectedAppointments() {
    let appts: Appointment[] = this.allAppointments;
    this.appointments = [];
    if (appts) {
      appts.forEach(a => {
        if (a.startTime.split('T')[0] == this.date.getTodaysDateTime().split(' ')[0] && a.appointment_Status == "Rejected") {
          this.appointments.push(a);
          this.count++;
        }
      })
    }
    this.NumberOfRejectedAppt = this.appointments.length;
    return this.NumberOfRejectedAppt;
  }

  //method-physician responding to patient appointments
  respondAppointment(id: number, status: number, uniqueKey: string) {
    this.service.updateAppointment(id, status, this.authService.name, this.date.getTodaysDateTime()).subscribe(sucess => console.log("success"),
      error => console.log(error))
    this.appointments.forEach(a => {
      if (a.appointmentID == id) {
        a.appointment_Status = this.findStatus(status);
      }
    })
    this.sendNotification(id, status, uniqueKey); //send notification to patient
    var lock = document.getElementById('actions');
    lock.className = 'actions actionsLock';

  }

  //method-sendnotification
  sendNotification(id: number, status: number, uniqueKey: string) {
    if (status == 1) //status is approved
    {
      this.notification.receiver_UserID = uniqueKey;
      this.notification.notificationType = new NotificationType();
      this.notification.notificationType.url = "URL";
      this.notsrvc.SendNotificationIfAppointmentSuccess(this.notification).subscribe(not => {
        console.log("Notification service call " + not);
      });
      console.log(this.notification);
    }
    //status is rejected
    else {
      this.notification.receiver_UserID = uniqueKey;
      this.notification.notificationType = new NotificationType();
      this.notification.notificationType.url = "URL";
      this.notsrvc.SendNotificationIfAppointmentDenied(this.notification).subscribe(not => {
        console.log("Denied" + not);
      });
    }
  }

  findStatus(stat: number): string {
    if (stat == 1) {
      return "Approved";
    }
    else
      return "Rejected";
  }
}