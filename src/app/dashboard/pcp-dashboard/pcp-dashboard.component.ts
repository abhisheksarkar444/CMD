import { Component, OnInit } from "@angular/core";
import { LocationService } from "../services/location.service";
import { PhysicianService } from "../services/physician.service";
import { BiscuitService } from "../services/biscuit.service";
import { AppointmentDetailService } from "../services/appointment-detail.service";
import { Location } from "../models/location.model";
import { Physician } from "../models/physician.model";
import { Appointment } from "../models/appointment.model";

@Component({
  selector: "kkd-pcp-dashboard",
  templateUrl: "./pcp-dashboard.component.html",
  styleUrls: ["./pcp-dashboard.component.css"]
})
export class PcpDashboardComponent implements OnInit {
  prev = "";
  today = "primary";
  next = "";

  num: any;
  last: number = 0;
  locations: Location[];
  physicians: Physician[];
  selectedLocation: string;
  selectedPhysician: string;
  biscuits = [];
  date: string;
  day: number = 1;
  temp: Appointment;
  appointment: Array<Appointment> = [];
  dateAppointment: Array<Appointment> = [];
  urgent: Array<Appointment> = [];
  cancelled: Array<Appointment> = [];
  constructor(
    private locationService: LocationService,
    private physicianService: PhysicianService,
    private biscuitService: BiscuitService,
    private appointmentDetailService: AppointmentDetailService
  ) {
    this.locations = this.locationService.getLocations();
    this.physicians = this.physicianService.getPhysicians();
    this.selectedLocation = this.getSelectedValue(this.locations, "locationId");
    this.selectedPhysician = this.getSelectedValue(
      this.physicians,
      "physicianId"
    );
    this.biscuits = this.biscuitService.getBiscuits();
  }
  now: Date = new Date();
  totalRec: number;
  page: number = 1;
  ngOnInit() {
    this.appointmentDetailService.getTotalAppointments().then((x: Appointment[]) => {
      this.appointment = x;
      this.dateAppointment = this.appointmentDetailService.getAppointmentByDate(0, this.appointment);
      this.urgent = this.appointmentDetailService.getUrgentAppointment(this.dateAppointment);
      this.cancelled = this.appointmentDetailService.getCancelledAppointment(this.dateAppointment);
    });
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

  switchColor(id: number) {
    switch (id) {
      case -1:
        this.prev = "primary";
        this.today = "";
        this.next = "";
        break;
      case 0:
        this.prev = "";
        this.today = "primary";
        this.next = "";
        break;
      case 1:
        this.prev = "";
        this.today = "";
        this.next = "primary";
        break;
      default:
        this.prev = "";
        this.next = "";
        this.today = "";
        break;
    }
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

  getSelectedValue(arr: any[], keyName: string) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].hasOwnProperty("selected")) {
        return arr[i][keyName];
      }
    }
  }

  convertIdToName(
    arr: any[],
    idToCheck: string,
    valueToConvert: string,
    valueToReturn: string
  ) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][idToCheck] === valueToConvert) {
        return arr[i][valueToReturn];
      }
    }
  }
}