import { Component, OnInit, Input } from "@angular/core";
import { NotificationService } from 'src/app/notification/services/notification.service';
import { Notification } from 'src/app/notification/models/notification.model';
import * as signalR from '@aspnet/signalr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/AuthService';

@Component({
  selector: "kkd-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  notifications: Notification[] = [];
  userId: string;
  username: string;
  imgSrc: string;
  @Input() currentUser;

  constructor(private route: ActivatedRoute, private router: Router, private notificationService: NotificationService, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.getuserRole() == "Physician") {
      this.imgSrc = `https://www.docsapp.in/website_assets/main-page/aditi-kunte.jpg`;
    }
    else {
      this.imgSrc = `http://digitalimagemakerworld.com/images/profile/36368965-profile-pics.jpg`;
    }
    this.username = this.currentUser.profile.given_name;

    //getting UserId using Authentication Service
    this.userId = this.authService.getuserUniqueId();

    //Establish Connection between Angular and Server and While deploying replace localhost:44355 with desired url
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("http://172.30.11.7:8324//notification?username=" + this.userId)
      .build();

    connection.start().then(function () {
    }).catch(function (err) {
      return console.error(err.toString());
    });

    //Catches Broadcast of notification when SendPrecriptionSentNotification Service is Invoked
    connection.on("SendPrescriptionSentNotification", (notification: Notification) => {
      this.notifications.push(notification);
      this.notifications.sort((a, b) => b.id - a.id);
    })

    //Catches BroadCast of notification when SendAppountmentNotificationIfMadeAppointment Service is Invoked
    connection.on("SendAppointMentNotificationIfMadeAppointMent", (notification: Notification) => {
      this.notifications.push(notification);
      this.notifications.sort((a, b) => b.id - a.id);
    })

    //Catches Broadcast of notification when SendAppointmentNotificationIfDenied Service is Invoked
    connection.on("SendAppointMentNotificationIfDenied", (notification: Notification) => {
      this.notifications.push(notification);
      this.notifications.sort((a, b) => b.id - a.id);
    })

    this.GetAllNotifications();
  }


  //Below Method is used to GetAllNotifications for a specific user
  GetAllNotifications() {

    this.notificationService.GetAllNotification(this.userId).subscribe(
      notifications => {
        this.notifications = notifications;
      },
      err => {
        this.notifications = [];
      });

  }

  Logout() {
    this.authService.signout();
  }
}