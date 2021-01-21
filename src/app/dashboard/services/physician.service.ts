import { Injectable } from "@angular/core";

import { Physician } from "../models/physician.model";

@Injectable({
  providedIn: "root"
})
export class PhysicianService {
  private physicians: Physician[] = [
    { physicianId: "id1", physicianName: "John Doe", selected: true, profilePhoto_Path: "" }
  ];

  getPhysicians() {
    return this.physicians.slice();
  }
}
