import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Patient } from 'src/app/Chats/dataTypes/Patients.type';

@Component({
  selector: 'kkd-newappointment-schedule',
  templateUrl: './newappointment-schedule.component.html',
  styleUrls: ['./newappointment-schedule.component.css']
})
export class NewappointmentScheduleComponent implements OnInit, OnChanges {
  @Input() otherId: string;
  @Input() userUniqueKey: string;
  @Input() status: string;
  @Input() userRole: string;
  constructor() { }

  ngOnChanges() {
    this.ngOnInit();

  }
  ngOnInit() {
  }

}
