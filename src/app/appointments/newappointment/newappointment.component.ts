import { Component, OnInit } from '@angular/core';
import { Appointment } from '../dataTypes/Appointment';


@Component({
  selector: 'kkd-newappointment',
  templateUrl: './newappointment.component.html',
  styleUrls: ['./newappointment.component.css']
})


export class NewappointmentComponent implements OnInit {

  Appointment: Appointment = new Appointment();
  constructor() { }

  ngOnInit() {
  }

}

