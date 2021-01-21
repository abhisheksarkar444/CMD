import { Component, OnInit, Input } from "@angular/core";
import { Prescription } from '../../models/Prescription.model';

@Component({
  selector: "kkd-prescriptions",
  templateUrl: "./prescriptions.component.html",
  styleUrls: ["./prescriptions.component.css"]
})
export class PrescriptionsComponent implements OnInit {
  @Input() listItems;
  prescription: Prescription;
  constructor() { }
  ngOnInit() {
    this.prescription = this.listItems[0];
  }

  prescriptionInitialize(item: Prescription) {
    this.prescription = item;
  }
}
