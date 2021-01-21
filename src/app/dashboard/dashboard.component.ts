import { Component } from "@angular/core";
import { AuthService } from '../shared/services/AuthService';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent {

  isDoctor = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.getuserRole() == "Physician") {
      this.isDoctor = true;
    }
  }
}
