import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  startOfDay, endOfDay, startOfMonth, endOfMonth, isSameDay, isSameMonth, endOfWeek, startOfWeek, setHours, setMinutes,
} from 'date-fns';
import { Observable } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { colors } from './types/colors';
import { AuthService } from 'src/app/shared/services/AuthService';
import { AppointmentService } from '../service/appointment.service';
import { Appointment } from '../model/appointment.model';

@Component({
  selector: 'kkd-appointment-grid-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './appointment-grid-view.component.html',
  styleUrls: ['./appointment-grid-view.component.css'],

})

export class AppointmentGridViewComponent implements OnInit {
  view: string = 'month';
  viewDate: Date = new Date();

  events$: Observable<Array<CalendarEvent<{ appointment: Appointment; }>>>;

  activeDayIsOpen: boolean = false;
  status: any = 1;
  constructor(private http: HttpClient, private authservice: AuthService, private apptService: AppointmentService) { }
  ngOnInit() {
    this.fetchEvents();
  }


  //method-get current time zone
  getTimezoneOffsetString(date: Date, dateString: string): string {
    const time = dateString.split('T')[1];
    const timezoneOffset = date.getTimezoneOffset();
    const hoursOffset = String(
      Math.floor(Math.abs(timezoneOffset / 60))
    ).padStart(2, '0');
    const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
    const direction = timezoneOffset > 0 ? '-' : '+';

    return `T${time}${direction}${hoursOffset}:${minutesOffset}`;
  }


  //method-display the date in required format
  getFormatedDate(date: string): string {
    return date.split('T')[0].split(':').reverse().join('-');
  }


  //method-to get the appointment start-time
  getStartTime(appointment): Date {
    const date = new Date(
      this.getFormatedDate(appointment.startTime) + this.getTimezoneOffsetString(this.viewDate, appointment.startTime)
    )
    const minutes = setMinutes(date, 0);
    const hours = setHours(minutes, 1);
    return date;
  }

  //method-fetched all the events for the particular months week and day
  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    this.events$ = this.apptService
      .calenderService(this.status, this.authservice.getuserUniqueId())
      .pipe(
        map((appointments: Appointment[]) => {
          return appointments.map((appointment: Appointment) => {
            return {
              title: appointment.memberFirstName + " Wants to visit for " + function (): string {
                let str = '';
                for (let index = 0; index < appointment.reasons.length - 1; index++) {
                  str = str + appointment.reasons[index].description + ',';
                }
                str = str + appointment.reasons[appointment.reasons.length - 1].description + '.';
                return str;
              }(),

              start: this.getStartTime(appointment),

              color: this.getColor(this.getStartTime(appointment)),
              meta: {
                appointment
              }
            };
          });
        })
      );
  }

  //method-to set the color for past and current events
  getColor(date: Date): any {
    if (date < this.viewDate) {
      return colors.red;
    }
    else if (date == this.viewDate) {
      return colors.yellow;
    }
    else {
      return colors.red;
    }
  }

  //method- to give the events for a particular day in a drop-down format
  dayClicked({
    date,
    events
  }: {
    date: Date;
    events: Array<CalendarEvent<{ event: Appointment }>>;
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
  view1: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate1: Date = new Date();
  activeDayIsOpen1: boolean = true;

}