import { Component, OnInit, Input } from "@angular/core";
import { Biscuit } from "../../models/biscuit.model";
import { AppointmentDetailService } from "../../services/appointment-detail.service";
import { BiscuitService } from "../../services/biscuit.service";
import { Appointment } from "../../models/appointment.model";

@Component({
  selector: "kkd-biscuit",
  templateUrl: "./biscuit.component.html",
  styleUrls: ["./biscuit.component.css"]
})
export class BiscuitComponent implements OnInit {
  @Input()
  biscuit: Biscuit;
  appointment: Array<Appointment> = [];
  dateAppointment: Array<Appointment> = [];
  urgent: Array<Appointment> = [];
  cancelled: Array<Appointment> = [];

  constructor(
    private appointmentDetailService: AppointmentDetailService,
    private biscuitService: BiscuitService

  ) { }
  ngOnInit() {
    this.appointmentDetailService.getTotalAppointments().then((x: Appointment[]) => {
      this.appointment = x;
      this.dateAppointment = this.appointmentDetailService.getAppointmentByDate(0, this.appointment);
      this.urgent = this.appointmentDetailService.getUrgentAppointment(this.dateAppointment);
      this.cancelled = this.appointmentDetailService.getCancelledAppointment(this.appointment);
      if (this.biscuit.title == "Total") {
        this.biscuit.todaysCount = this.appointment.length;
      }

      if (this.biscuit.title == "Today") {
        this.biscuit.todaysCount = this.dateAppointment.length;
      }

      if (this.biscuit.title == "Immediate") {
        this.biscuit.todaysCount = this.urgent.length;
      }

      if (this.biscuit.title == "Canceled") {
        this.biscuit.todaysCount = this.cancelled.length;
      }
    });
  }
}
