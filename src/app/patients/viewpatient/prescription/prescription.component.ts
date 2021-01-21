import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PatientListModule } from '../../Common/patientList-module';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'kkd-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})

export class PrescriptionComponent implements OnInit, OnChanges {
  @Input() selectedPatient: PatientListModule;
  @Input() ApID: number;
  @Input() jsonpatientt: any;
  @Input() uuidpatient: any;
  medicines: any[];
  prescription: any;
  checker: boolean = false;
  firstAppointmentDefault: any;

  constructor(private service: PatientService) { }

  ngOnInit() {
    //
    this.service.getAppointmentsByPatientUniqueKey(this.jsonpatientt.patientUniqueKey).subscribe(unique => {
      this.firstAppointmentDefault = unique[0];
      this.service.getPrescriptionByAppointmentID(this.firstAppointmentDefault.appointmentID).subscribe(apid => {
        this.prescription = apid
        this.service.getMedicinesByPrescriptionId(this.prescription[0].prescriptionID).subscribe(info =>
          this.medicines = info)
      });
    });
  }

  ngOnChanges() {
    this.checker = true;
    this.service.getPrescriptionByAppointmentId(this.ApID).then((x: any) => {
      this.prescription = x;
      this.service.getMedicinesByPrescriptionId(this.prescription[0].prescriptionID)
        .subscribe(info => this.medicines = info);
    });
  }
} 
