import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'kkd-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent implements OnInit {
  @Input() jsonpatientt: any;
  @Input() uuidpatient: any;
  @Input() ApID: number;
  @Output() ApIDChange = new EventEmitter(); //child to parent
  app: any[];

  constructor(private service: PatientService, private route: ActivatedRoute) { }

  ngOnInit() {
    //This method is used to get all the Appointments related to that patient by passing PatientUniqueKey as parameter
    this.service.getAppointmentsByPatientUniqueKey(this.jsonpatientt.patientUniqueKey).subscribe(info => {
      this.app = info;
    });
  }


  //This function is used to get the selected Appointment by passing AppointmentID.
  selectAppointment(id: number) {
    this.ApIDChange.emit(id);
  }
}
