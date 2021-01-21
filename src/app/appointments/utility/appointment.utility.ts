import { NgModule } from '@angular/core';

@NgModule()
export class AppointmentUtil {

  //method-to get the todays date and time
  getTodaysDateTime() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let date = dd < 10 ? "0" + dd : dd;
    let month = mm < 10 ? "0" + mm : mm;
    return yyyy + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

  }
}