import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AddMedicineComponent } from './AddMedicine/add-medicine.component';
import { Medicine } from '../dataTypes/Medicine';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kkd-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  @ViewChild(AddMedicineComponent, { static: false }) addMedicine: AddMedicineComponent;
  newMedList: Medicine[] = [];
  @Input() patientKey: string;
  @Input() providerKey: string;
  constructor(private route: ActivatedRoute, public activeModal: NgbActiveModal) {
  }
  ngAfterViewInit() {
  }
  ngOnInit() {

  }
  Submit() {
    this.addMedicine.Confirm();
  }
}
