import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "kkd-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"]
})
export class NotificationComponent implements OnInit {
  @Input() notifications;
  @Input() p;


  constructor() { }

  ngOnInit() { }

  //This Method is build to customize date and time for the user to be shown in the notification
  GetTimeDifference(notytime: string): string {
    let notificationtime = new Date(notytime);
    let currenttime = new Date();
    let diffhrs = Math.abs(currenttime.getHours() - notificationtime.getHours());
    let difdate = Math.abs(currenttime.getDate() - notificationtime.getDate());
    let difmin = Math.abs(currenttime.getMinutes() - notificationtime.getMinutes());
    let difsec = Math.abs(currenttime.getSeconds() - notificationtime.getSeconds());
    if (difdate > 0) {
      return difdate.toString() + " days";
    }
    else if (diffhrs > 0) {
      return diffhrs.toString() + " hrs";
    }
    else if (difmin > 0) {
      return difmin.toString() + " mins";
    }
    else {
      return difsec.toString() + " secs";
    }
  }
}
