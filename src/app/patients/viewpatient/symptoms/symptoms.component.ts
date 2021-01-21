import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PatientListModule } from '../../Common/patientList-module';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'kkd-symptoms',
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css']
})
export class SymptomsComponent implements OnInit, OnChanges {
  @Input() selectedPatient: PatientListModule;
  @Input() patientt: PatientListModule;
  @Input() ApID: number;
  symptoms: Symptom[];

  Aid: number;
  checker: boolean = false;
  firstAppointmentDefault: any;

  @Input() jsonpatientt: any;
  constructor(private service: PatientService) { }

  ngOnInit() {
    this.service.getAppointmentsByPatientUniqueKey(this.jsonpatientt.patientUniqueKey).subscribe(unique => {
      this.firstAppointmentDefault = unique[0];
      this.service.getSymptomsByAppointmentId(this.firstAppointmentDefault.appointmentID).then((y: any) => {
        this.symptoms = y;

      });
    });
  }
  currentlyOpenedItemIndex = -1;

  setOpened(itemIndex) {
    this.currentlyOpenedItemIndex = itemIndex;
  }

  setClosed(itemIndex) {
    if (this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }
  }

  ngOnChanges() {
    this.checker = true;
    this.service.getSymptomsByAppointmentId(this.ApID).then((y: any) => {
      this.symptoms = y;
    });
  }

}

export class Symptom {
  descriptions: any;
}