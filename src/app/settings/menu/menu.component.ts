import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kkd-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  menuOptions = [
    {
      text: "Account Settings",
      link: "account-settings"
    },
    {
      text: "Generic Questions",
      link: "generic-questions"
    },
    {
      text: "Availablity Settings",
      link: "availability-settings"
    }
  ];
  constructor() { }

  ngOnInit() { }
}
