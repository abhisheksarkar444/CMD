import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Appointment } from '../../models/appointment.model';
import { AppointmentDetailService } from '../../services/appointment-detail.service';
import { PatientService } from '../../services/patient.service';
import { Physician } from '../../models/physician.model';

@Component({
  selector: "kkd-pcp-info-card",
  templateUrl: "./pcp-info-card.component.html",
  styleUrls: ["./pcp-info-card.component.css"]
})
export class PcpInfoCardComponent implements OnInit {
  @Input() detail: Appointment;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  cancelled: boolean = false;
  isLoading: boolean = false;
  status: boolean;
  title: string = "Physician";

  constructor(private appointmentService: AppointmentDetailService, private patientService: PatientService) { }

  ngOnInit() {
    if (this.detail.appointment_Status == "Approved" || this.detail.appointment_Status == "Closed") {
      this.status = true;
    } else {
      this.status = false;
    }
    this.getPhysicianImage();
  }

  public getPhysicianImage() {
    this.patientService.getPhysicianImage(this.detail.providerUniqueKey).subscribe((p: Physician) => {
      this.detail.patientImage = p.profilePhoto_Path;
    });
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
        }
      });
  }
}
