import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PatientappointmentStepperComponent } from '../patientappointment-stepper.component';
import { Appointment } from '../../../dataTypes/Appointment';
import { AppointmentService } from 'src/app/appointments/service/appointment.service';

@Component({
  selector: 'kkd-patientappointmentstep3',
  templateUrl: './newappointmentstep3.component.html',
  styleUrls: ['./newappointmentstep3.component.css']
})
export class PatientAppointmentstep3Component implements OnInit {

  submit: boolean = true;
  @Input() parent: PatientappointmentStepperComponent;
  @Input() Appointment: Appointment;
  @Output() AppointmentChange = new EventEmitter();
  day: string = null;
  toggle: boolean = true;
  selectedTime: number
  Schedules: any[] = [];
  interval: any;
  startTime: any;
  EndTime: any;
  AllAppointments: any;
  AlreadyBookedTimings: any[] = [];
  AllTimings: any[];
  Availibility: boolean = true;
  proceed: boolean = false;;
  Choose: boolean = false;
  key: string;
  Intervals: any[] = [];
  dummyAppointments: any[] = [];

  no: number = 0;
  upcoming: boolean = true;
  date: Date;

  constructor(private service: AppointmentService) { }

  ngOnInit() {
    let current = new Date();
    current.setDate(current.getDate() + 1);
    this.onDateChanged(current);
  }

  public onDateChanged(event) {
    if (this.no >= 1) {
      this.upcoming = false;
    }
    this.no = this.no + 1;
    this.Availibility = true;
    let dat: Date = event;
    this.date = event;
    let current = new Date();

    if (dat < current) {
      this.Availibility = false;

    }
    else {
      this.setDay(dat);
      this.service.getSchedulesByKeyAndDay(this.Appointment.providerUniqueKey, this.day).subscribe(schedules => {
        this.Schedules = schedules;
        if (this.Schedules.length == 0) {
          this.Availibility = false;
        }
        else {
          this.Choose = true;
          this.interval = this.Schedules[0].slotInterval_Minutes;
          let startTimeData = this.Schedules[0].startTime.split(':');
          let st = this.getDate(startTimeData, event);
          this.startTime = st;
          let endTimeData = this.Schedules[0].endTime.split(':');
          let et = this.getDate(endTimeData, event);
          this.EndTime = et;
          this.getIntervals();
        }
      })

      this.service.getAppointmentsByProviderKeyAndDate(this.Appointment.providerUniqueKey, `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`).subscribe(appoint => {
        this.AllAppointments = appoint;
        for (let a = 0; a < this.AllAppointments.length; a++) {
          this.AlreadyBookedTimings.push(this.AllAppointments[a].startTime);
        }
      });
    }
  }

  getIntervals() {
    this.Intervals = [];
    for (let t = this.startTime; t < this.EndTime;) {
      let d = new Date(t);
      this.Intervals.push(d);
      t.setMinutes(t.getMinutes() + this.interval);
    }
  }

  checkTimeBooking(time: any): boolean {
    for (let i = 0; i < this.AlreadyBookedTimings.length; i++) {
      let month = this.AlreadyBookedTimings[i].substring(5, 7);
      let date = this.AlreadyBookedTimings[i].substring(8, 10);
      let hrs = this.AlreadyBookedTimings[i].substring(11, 13);
      let min = this.AlreadyBookedTimings[i].substring(14, 16);

      if (+time.getMonth() + 1 == month && +time.getDate() == date && +time.getHours() == hrs && +time.getMinutes() == min) {
        return false;
      }
    }
    return true;
  }

  selectSlot(time: Date) {
    this.proceed = true;
    this.Appointment.startTime = new Date(time);
    this.Appointment.startTime.setHours(time.getHours() + 5);
    this.Appointment.startTime.setMinutes(time.getMinutes() + 30);
    let endTime = new Date(this.Appointment.startTime);
    endTime.setMinutes(this.Appointment.startTime.getMinutes() + this.interval);
    this.Appointment.endTime = endTime;
  }

  setDay(dat) {
    switch (dat.getDay()) {
      case (1):
        {
          this.day = "Monday";
          break;
        }
      case (2):
        {
          this.day = "Tuesday";
          break;
        }
      case (3):
        {
          this.day = "Wednesday";
          break;
        }
      case (4):
        {
          this.day = "Thursday";
          break;
        }
      case (5):
        {
          this.day = "Friday";
          break;
        }
      default:
        this.day = null;;
        break;
    }
  }

  getDate(startTimeData, event) {
    let y = event.getFullYear();
    let m = event.getMonth();
    let d = event.getDate();
    let st = new Date(y, m, d, startTimeData[0], startTimeData[1], startTimeData[2]);
    return st;
  }
}