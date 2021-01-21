import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { AppointmentDetailService } from '../../services/appointment-detail.service';
import { PatientService } from '../../services/patient.service';
import { Physician } from '../../models/physician.model';
import { Notification } from 'src/app/notification/models/notification.model';
import { NotificationType } from 'src/app/notification/models/notificationtype.model';
import { NotificationService } from 'src/app/notification/services/notification.service';

@Component({
  selector: 'kkd-pcp-card',
  templateUrl: './pcp-card.component.html',
  styleUrls: ['./pcp-card.component.css']
})
export class PcpCardComponent implements OnInit {
  @Input() detail: Appointment;
  @Input() num: number;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();


  notification: Notification = new Notification();
  isLoading: boolean = false;
  age: number = 24;
  cancelled: boolean = false;
  status: boolean;
  cancelStatus: any;

  constructor(
    private appointmentService: AppointmentDetailService,
    private patientService: PatientService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    if (this.detail.appointment_Status == "Approved" || this.detail.appointment_Status == "Closed") {
      this.status = true;
    } else {
      this.status = false;
    }
    this.getPcpImage();
  }
  public getPcpImage() {
    this.patientService.getPhysicianImage(this.detail.providerUniqueKey)
      .subscribe((x: Physician) => {
        this.detail.patientImage = x.profilePhoto_Path;
      })
  }

  public Cancel() {
    this.isLoading = true;
    this.appointmentService
      .updateAppointmentStatusById(this.detail.appointmentID.toString(), "3")
      .subscribe((status: string) => {
        if (status == "Success") {
          this.status = false;
          this.cancelled = true;
          this.valueChange.emit(this.detail.appointmentID);
          this.isLoading = false;
          this.DenyNotification();
        }
      });
  }

  public Approve() {
    this.isLoading = true;
    this.appointmentService
      .updateAppointmentStatusById(this.detail.appointmentID.toString(), "1")
      .subscribe((status: string) => {
        if (status == "Success") {
          this.status = true;
          this.cancelled = false;
          this.detail.appointment_Status = "Approved";
          this.isLoading = false;
          this.ApproveNotification();
        }
      });
  }


  public ApproveNotification() {
    this.notification.receiver_UserID = this.detail.providerUniqueKey;
    this.notification.notificationType = new NotificationType();
    this.notification.notificationType.url = `http://172.30.11.7:8326/appointementConfirmaton/` + `${this.detail.appointmentID}`;
    this.notificationService.SendNotificationIfAppointmentSuccess(this.notification).subscribe(not => {
      console.log("Notification service call " + not);
    });
  }

  public DenyNotification() {
    this.notification.receiver_UserID = this.detail.providerUniqueKey;
    this.notification.notificationType = new NotificationType();
    this.notification.notificationType.url = `http://172.30.11.7:8326/appointementConfirmaton/` + `${this.detail.appointmentID}`;
    this.notificationService.SendNotificationIfAppointmentDenied(this.notification).subscribe(not => {
      console.log("Notification service call " + not);
    });
  }
}
