import { Injectable } from "@angular/core";
import { AppointmentDetailService } from './appointment-detail.service';

@Injectable({
  providedIn: "root"
})
export class BiscuitService {

  constructor(private appointmentDetailService: AppointmentDetailService) { }

  private biscuits = [
    {
      title: "Total",
      info: "13.8",
      class: "decrement",
      icon: "ion-md-arrow-round-down",
      todaysCount: 0,
      barChartData: [
        {
          name: "a",
          value: 12
        },
        {
          name: "b",
          value: 15
        },
        {
          name: "c",
          value: 9
        },
        {
          name: "d",
          value: 3
        },
        {
          name: "e",
          value: 6
        },
        {
          name: "f",
          value: 12
        },
        {
          name: "g",
          value: 17
        }
      ]
    },
    {
      title: "Today",
      info: "13.8",
      class: "increment",
      icon: "ion-md-arrow-round-up",
      todaysCount: 0,
      barChartData: [
        {
          name: "a",
          value: 12
        },
        {
          name: "b",
          value: 15
        },
        {
          name: "c",
          value: 6
        },
        {
          name: "d",
          value: 5
        },
        {
          name: "e",
          value: 8
        },
        {
          name: "f",
          value: 13
        },
        {
          name: "g",
          value: 16
        }
      ]
    },
    {
      title: "Canceled",
      info: "0",
      class: "neutral",
      icon: "ion-md-arrow-round-forward",
      todaysCount: 0,
      barChartData: [
        {
          name: "a",
          value: 16
        },
        {
          name: "b",
          value: 3
        },
        {
          name: "c",
          value: 6
        },
        {
          name: "d",
          value: 8
        },
        {
          name: "e",
          value: 7
        },
        {
          name: "f",
          value: 6
        },
        {
          name: "g",
          value: 11
        }
      ]
    },
    {
      title: "Immediate",
      info: "13.8",
      class: "decrement",
      icon: "ion-md-arrow-round-down",
      todaysCount: 0,
      barChartData: [
        {
          name: "a",
          value: 11
        },
        {
          name: "b",
          value: 13
        },
        {
          name: "c",
          value: 8
        },

        {
          name: "d",
          value: 3
        },
        {
          name: "e",
          value: 7
        },
        {
          name: "f",
          value: 6

        },
        {
          name: "g",
          value: 5
        }
      ]
    }
  ];

  getBiscuits() {
    return this.biscuits;
  }

}
