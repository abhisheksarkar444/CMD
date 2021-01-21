import { Component, OnInit, ApplicationRef } from '@angular/core';
import { GoogleFitService } from '../services/google-fit.service';

@Component({
  selector: 'kkd-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.css']
})
export class VitalsComponent implements OnInit {

  ecg: number = 79;
  temperature: number = 23;
  diabetes: number = 300;
  respirationRate: number = 14;
  calories: number = 0;
  steps: number = 0;
  sleep: number = 0;
  intial_data: any[] = [
    {
      name: "a",
      value: 100
    },
    {
      name: "b",
      value: 100
    },
    {
      name: "c",
      value: 100
    },
    {
      name: "d",
      value: 100
    },
    {
      name: "e",
      value: 100
    },
    {
      name: "f",
      value: 100
    },
    {
      name: "g",
      value: 100
    }
  ];
  calories_data: any[] = this.intial_data;
  steps_data: any[] = this.intial_data;;
  sleep_data: any[] = this.intial_data;
  gapi: any;
  auth2: any;
  token: string;
  barGraphSpikesLimit: number = 6;
  private clientId = '723232807175-e07rp5saqjrbovmk9kisnvbhgoj74qcq.apps.googleusercontent.com';
  isSignedIn: boolean;

  constructor(private gfService: GoogleFitService, private appref: ApplicationRef) { }

  ngOnInit() {
    //Refresh Variables after every 3 seconds
    setInterval(() => {
      this.appref.tick();
    }, 3000);
  }

  //Method to get Step, Sleep and Calories data from service
  getData() {
    //Getting step and calories data from service
    this.gfService.getGoogleFitData(this.token)
      .subscribe((data) => {
        let datum = data["bucket"];
        let start = 0;
        this.steps_data = [];
        this.calories_data = [];
        //Getting latest calories and steps data readings from fetched data
        for (let i = datum.length - 1; i >= 0; i--) {
          if (datum[i]["dataset"][0]["point"].length == 0) {
            continue;
          } else {
            start = i - this.barGraphSpikesLimit >= 0 ? i - this.barGraphSpikesLimit : 0;
            this.steps = datum[i]["dataset"][0]["point"][0]["value"][0]["intVal"];
            this.calories = Math.round(datum[i]["dataset"][1]["point"][0]["value"][0]["fpVal"]);
            break;
          }
        }
        //Populating steps_data and calories_data for displaying graph
        for (let i = start; i < datum.length && datum[i]["dataset"][0]["point"][0] != undefined; i++) {
          var date = new Date(parseInt(datum[i]["startTimeMillis"].toString()));
          let name = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
          this.steps_data.push({ name: name, value: datum[i]["dataset"][0]["point"][0]["value"][0]["intVal"] });
          this.calories_data.push({ name: name, value: Math.round(datum[i]["dataset"][1]["point"][0]["value"][0]["fpVal"]) });
        }
      });

    //Getting sleep data from service
    this.gfService.getSleepData(this.token).subscribe(data => {
      this.sleep_data = [];
      let start = 0;
      let len = data["session"].length;
      //Getting latest sleep data readings from fetched data
      for (let i = len - 1; i >= 0; i--) {
        if (data["session"][i] == undefined)
          continue;
        else {
          start = i - this.barGraphSpikesLimit >= 0 ? i - this.barGraphSpikesLimit : 0;
          this.sleep = ((data["session"][i].endTimeMillis - data["session"][i].startTimeMillis) / 3600000);
          break;
        }
      }
      //Populating sleep_data for displaying graph
      for (let i = start; i < len; i++) {
        var date = new Date(parseInt(data["session"][i]["startTimeMillis"].toString()));
        let name = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        this.sleep_data.push({ name: name, value: (data["session"][i].endTimeMillis - data["session"][i].startTimeMillis) / 3600000 });
      }
    });
  }

  //Method to Intialize and Authorize Google Sign-In by setting up Client-Id and Scope
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        scope: 'https://www.googleapis.com/auth/fitness.activity.read'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  //Method to get Access_token
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        this.token = googleUser.Zi.access_token;
        //Calling getData()
        this.getData();
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}
