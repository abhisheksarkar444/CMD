import { Component, OnInit, ApplicationRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AvailabilityService } from '../shared/services/availability.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  time = this.fb.group({
    from: (''),
    to: (''),
    appDuration: ('')
  })
  availabilities = [];
  displayedColumns: string[] = ['dayOfWeek', 'startTime', 'endTime', 'slotInterval_Minutes', 'TotalAppointments', 'RemainingTime'];
  timeslots = [];
  times = [];
  totSlots = [];
  timewasted = [];
  constructor(private fb: FormBuilder, private avsvc: AvailabilityService, private appref: ApplicationRef) { }

  ngOnInit() {
    this.getAvailability();


  }
  getAvailability() {
    this.avsvc.get()
      .subscribe((data: []) => {
        data.forEach((item) => {
          this.availabilities.push(item);
        });
        this.timeslots = new Array(this.availabilities.length);
        for (let i = 0; i < this.availabilities.length; i++) {
          let starttime = this.availabilities[i]["startTime"];
          this.times = [starttime];
          this.timeslots[i] = new Array();
          while (starttime <= this.availabilities[i]["endTime"]) {
            const temp = starttime;
            starttime = this.addMinutes(temp, this.availabilities[i]["slotInterval_Minutes"]);
            if (starttime <= this.availabilities[i]["endTime"])
              this.times.push(starttime);
            else
              break;
          }
          for (let j = 0; j < this.times.length - 1; j++) {
            this.timeslots[i].push(`${this.times[j]}-${this.times[j + 1]}`);
          }
          this.timewasted.push((this.availabilities[i]["endTime"].split(':')[0] - this.times[this.times.length - 1].split(':')[0]) * 60 +
            (this.availabilities[i]["endTime"].split(':')[1] - this.times[this.times.length - 1].split(':')[1]));
          this.totSlots.push(this.timeslots[i].length);

        }
      });
  }

  days: string[];

  addMinutes(time, minutes) {
    var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
    var tempTime = ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
      ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
      ((date.getSeconds().toString().length == 1) ? '0' + date.getSeconds() : date.getSeconds());
    return tempTime;
  }

  addAvailability() {
    this.days.forEach(day => {
      let availability = {
        "dayOfWeek": day,
        "startTime": this.time.value.from,
        "endTime": this.time.value.to,
        "slotInterval_Minutes": parseInt(this.time.value.appDuration),
        "status": "AVAILABLE",
        "yesNoOption": 1
      }
      if (availability.startTime > availability.endTime) {
        alert("Start time should be less than End time");
      }
      else {
        this.avsvc.post(availability)
          .subscribe(response => console.log(response));
        let starttime = availability["startTime"];
        this.times = [starttime];
        while (starttime <= availability["endTime"]) {
          const temp = starttime;
          starttime = this.addMinutes(temp, availability["slotInterval_Minutes"]);
          // if(starttime <= availability["endTime"])
          this.times.push(starttime);
          // else
          // break;
        }

        this.timeslots.push(new Array());
        let len = this.timeslots.length - 1;
        console.log(this.times);
        for (let j = 0; j < this.times.length - 1; j++) {
          //this.timeslots[i].push(`${this.times[j]}-${this.times[j+1]}`);
          this.timeslots[len].push(`${this.times[j]}-${this.times[j + 1]}`);
        }
        this.timewasted.push((availability["endTime"].split(':')[0] - this.times[this.times.length - 1].split(':')[0]) * 60 +
          (availability["endTime"].split(':')[1] - this.times[this.times.length - 1].split(':')[1]));
        this.totSlots.push(this.timeslots[this.timeslots.length - 1].length);
        this.availabilities.push(availability);
      }
    });

  }

  onChanged(days: string[]) {
    this.days = days;
  }

}