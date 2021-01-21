import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AppointmentHistoryService } from 'src/app/appointments/service/appointmentHistory.service';
import { Appointment } from 'src/app/appointments/dataTypes/Appointment';

@Component({
  selector: 'kkd-schedulepatientdetails',
  templateUrl: './schedulepatientdetails.component.html',
  styleUrls: ['./schedulepatientdetails.component.css']
})
export class SchedulepatientdetailsComponent implements OnInit, OnChanges {
  ngOnChanges() {
    this.ngOnInit();
  }
  isComp = 1;
  constructor(private service: AppointmentHistoryService) { }

  @Input() otherId: string;
  @Input() userUniqueKey: string;
  @Input() status: string;
  @Input() userRole: string;
  pendapp: Appointment[] = [];
  pendappSpl: any;
  compapp: Appointment[] = [];
  compappSpl: any;
  reasontemp = [];
  specialtemp = [];
  patientId: string;
  providerId: string;
  ngOnInit() {
    if (this.userRole === "Physician") {
      this.patientId = this.otherId;
      this.providerId = this.userUniqueKey;
    }
    else if (this.userRole === "Patient") {
      this.patientId = this.userUniqueKey;
      this.providerId = this.otherId;
    }
    if (+this.status === 1)
      this.completedmethod();
    else
      this.pendingmethod();
  }

  completedmethod() {
    this.isComp = 1;
    let completed: Appointment[] = [];
    let compSpl: any;
    if (this.userRole === "Patient") {

      this.service.getAppointmentsByBothKeysAndStatus(1, this.providerId, this.patientId).subscribe(((c: Appointment[]) => {
        c.forEach(d => {

          completed.push(d);
          this.service.getreasonsforAppointment(d["appointmentID"]).subscribe((c => {
            this.reasontemp.push(c);

            this.service.getspecialityByProviderkey(d["providerUniqueKey"]).subscribe((p: []) => {
              this.specialtemp.push(p);

            });

          }));

        });
        this.compapp = completed;
      }));
    }
    else if (this.userRole === "Physician") {
      this.service.getAppmtsbystatusbypatient(this.patientId, 1).subscribe(((c: Appointment[]) => {
        c.forEach(d => {

          completed.push(d);
          this.service.getreasonsforAppointment(d["appointmentID"]).subscribe((c => {
            this.reasontemp.push(c);
            this.service.getspecialityByProviderkey(d["providerUniqueKey"]).subscribe((p: []) => {
              this.specialtemp.push(p);

            });
          }));

        });
        this.compapp = completed;
      }));


    }
  }
  pendingmethod() {
    this.isComp = 0;
    let pending: Appointment[] = [];
    this.service.getAppointmentsByBothKeysAndStatus(4, this.providerId, this.patientId).subscribe(((c: Appointment[]) => {
      c.forEach(d => {
        pending.push(d);
        this.service.getreasonsforAppointment(d["appointmentID"]).subscribe((c => {
          this.reasontemp.push(c);
          this.service.getspecialityByProviderkey(d["providerUniqueKey"]).subscribe((p: []) => {
            this.specialtemp.push(p);
          });
        }));

      });
      this.pendapp = pending;
    }));
  }
}

