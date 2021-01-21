import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kkd-doctorselections',
  templateUrl: './doctorselections.component.html',
  styleUrls: ['./doctorselections.component.css']
})
export class DoctorselectionsComponent implements OnInit {

  listof_doctors: doctorNames[] = [
    { value: 'tanvi-0', viewValue: 'Tanvi' },
    { value: 'daniel-1', viewValue: 'Daniel' },
    { value: 'john-2', viewValue: 'John' }
  ];

  constructor() { }

  ngOnInit() {
  }

}

export class doctorNames {
  value: any;
  viewValue: any;
}