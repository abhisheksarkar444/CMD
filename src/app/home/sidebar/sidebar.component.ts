import { Component, OnInit, Input } from "@angular/core";
import { User } from 'oidc-client';
import { AuthService } from 'src/app/shared/services/AuthService';
import * as signalR from '@aspnet/signalr';
import { AddressBookService } from 'src/app/Chats/service/address-book.service';

@Component({
  selector: "kkd-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  @Input() isExpanded;
  appName: string = "Connect My Doc";
  currentUser: User;
  sidebarMenuItems = [];
  userId: string;
  userOnlineArray: string[] = [];

  constructor(private authService: AuthService, private adrsrv: AddressBookService) {
    this.authService.currentUser.subscribe(x => (this.currentUser = x));
    if (this.currentUser.profile.Role == 'Physician') {
      this.sidebarMenuItems = [
        {
          title: "Dashboard",
          icon: "ion-md-stats",
          routerLink: "/dashboard"
        },
        {
          title: "Patients",
          icon: "ion-md-person",
          routerLink: "/ViewAllPatients"
        },
        {
          title: "Chat Room",
          icon: "ion-md-chatboxes",
          routerLink: "/chat"
        },
        {
          title: "Appointments",
          icon: "ion-md-calendar",
          routerLink: "/appointmentlist"
        },
        {
          title: "Settings",
          icon: "ion-md-cog",
          routerLink: "/settings"
        }
      ]
    }
    else {
      this.sidebarMenuItems = [
        {
          title: "Dashboard",
          icon: "ion-md-stats",
          routerLink: "/dashboard"
        },
        {
          title: "Chat Room",
          icon: "ion-md-chatboxes",
          routerLink: "/chat"
        },
        {
          title: "Settings",
          icon: "ion-md-cog",
          routerLink: "/settings"
        }
      ]
    }
  }

  ngOnInit() {

    this.userId = this.authService.getuserUniqueId();

    const onlineconnection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("http://172.30.11.7:8325/useronline")
      .build();

    onlineconnection.start().then(() => {
      this.adrsrv.postUserUniqueKey(this.userId);
    }).catch(function (err) {
      return console.error(err.toString());
    });

    onlineconnection.on('UserOnlineBroadcast', (userUniqueKey = this.userId) => {
      this.adrsrv.getAllOnlineUsers().subscribe(x => {
        this.userOnlineArray = x;
        sessionStorage.setItem('onlineUsers', JSON.stringify(this.userOnlineArray));
      });
    })
  }
}
