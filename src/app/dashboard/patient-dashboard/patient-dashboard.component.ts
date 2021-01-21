import { Component, OnInit } from "@angular/core";
import { AppointmentDetailService } from "../services/appointment-detail.service";
import { Appointment } from '../models/appointment.model';
import { PatientService } from '../services/patient.service';
import { AuthService } from 'src/app/shared/services/AuthService';
import { Prescription } from '../models/Prescription.model';

@Component({
  selector: "kkd-patient-dashboard",
  templateUrl: "./patient-dashboard.component.html",
  styleUrls: ["./patient-dashboard.component.css"]
})
export class PatientDashboardComponent implements OnInit {
  Previous = "";
  Today = "primary";
  Upcoming = "";
  condition: string = "Today";
  appointment: Appointment[];
  dateAppointment: Appointment[];
  listItems: Prescription[];
  selectedIndex = 0;
  last: number = 0;
  page: any;
  totalRec: any;
  switchColor(id: number) {
    switch (id) {
      case -1:
        this.Previous = "primary";
        this.Today = "";
        this.Upcoming = "";
        this.condition = "Previous";
        break;
      case 0:
        this.Previous = "";
        this.Today = "primary";
        this.Upcoming = "";
        this.condition = "Today"
        break;
      case 1:
        this.Previous = "";
        this.Today = "";
        this.Upcoming = "primary";
        this.condition = "Upcoming"
        break;

      default:
        this.Previous = "";
        this.Today = "";
        this.Upcoming = "";
        this.condition = "Today"
        break;
    }
  }
  constructor(private appointmentDetailService: AppointmentDetailService, private patientServe: PatientService, private auth: AuthService) {
  }

  ngOnInit() {
    this.patientServe.getTotalAppointments().then((x: Appointment[]) => {
      this.appointment = x;
      this.dateAppointment = this.appointmentDetailService.getAppointmentByDate(this.last, this.appointment);
      this.listItems = this.patientServe.getPrescriptions(this.appointment);
      this.condition = "Today";
    });
  }

  getAppointmentsByDate(num: number) {
    this.last = num;
    this.switchColor(num);
    this.dateAppointment = this.appointmentDetailService.getAppointmentByDate(num, this.appointment);
    this.deleteCancelled();
  }

  deleteCancelled() {
    for (let index = 0; index < this.dateAppointment.length; index++) {
      if (this.dateAppointment[index].appointment_Status == "Canceled") {
        this.dateAppointment.splice(index, 1);
      }
    }
  }
  deleteObject(id: number) {
    if (this.dateAppointment.find(x => x.appointmentID == id)) {
      this.dateAppointment.splice(
        this.dateAppointment.findIndex(x => x.appointmentID == id), 1);
    }
    if (this.appointment.find(x => x.appointmentID == id)) {
      this.appointment.splice(
        this.appointment.findIndex(x => x.appointmentID == id), 1);
    }
  }


  requests = [
    {
      icon: "ion-md-add-circle-outline",
      text: "Request Appointment",
      redirect: "/newAppointments"
    }
  ];

}
