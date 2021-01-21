import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GoogleFitService implements OnInit {
  baseApiUrl: string = 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate';
  signedIn: boolean;
  TIME_PERIOD_IN_DAYS: number = 25;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  //Service to get Calories and Steps data from Google-Fit API
  public getGoogleFitData(token) {
    let startDate = new Date();
    let endDate = new Date();
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setDate(endDate.getDate() - this.TIME_PERIOD_IN_DAYS);
    let httpHeaders = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    let httpBody = {
      "aggregateBy": [{
        "dataTypeName": "com.google.step_count.delta",
        "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
      }, {
        "dataTypeName": "com.google.calories.expended",
        "dataSourceId": "derived:com.google.calories.expended:com.google.android.gms:platform_calories_expended"
      }],
      "bucketByTime": { "durationMillis": 86400000 },
      "startTimeMillis": startDate.getTime(),
      "endTimeMillis": endDate.getTime()
    };
    return this.http.post(`${this.baseApiUrl}`, httpBody, httpHeaders);
  }

  //Service to get Sleep data from Google-Fit API
  public getSleepData(token) {
    let startTime: any;
    startTime = new Date();
    startTime.setDate(startTime.getDate() - this.TIME_PERIOD_IN_DAYS);
    startTime.setHours(0);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    startTime = startTime.toISOString();
    let endTime = new Date().toISOString();
    let sleepApiUrl: string = `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startTime}&endTime=${endTime}`;
    let httpHeaders = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get(`${sleepApiUrl}`, httpHeaders);
  }

}
