import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kkd-clinicselections',
  templateUrl: './clinicselections.component.html',
  styleUrls: ['./clinicselections.component.css']
})
export class ClinicselectionsComponent implements OnInit {

  listof_hospitals: hospitalNames[] = [
    { value: 'apollo-0', viewValue: 'Apollo' },
    { value: 'manipal-1', viewValue: 'Manipal' },
    { value: 'hosmat-2', viewValue: 'Hosmat' }
  ];

  constructor() { }

  ngOnInit() {
  }

}

export class hospitalNames {
  value: any;
  viewValue: any;
}