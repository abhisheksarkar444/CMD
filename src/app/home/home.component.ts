import { Component, DoCheck, OnChanges, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/AuthService";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "oidc-client";

@Component({
  selector: "kkd-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements DoCheck {
  isExpanded: boolean = false;
  currentUser: User;
  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authService.currentUser.subscribe(x => (this.currentUser = x));
    
  }

  ngDoCheck() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  ToggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

}
