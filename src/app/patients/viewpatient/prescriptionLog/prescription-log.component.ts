import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'kkd-prescription-log',
  templateUrl: './prescription-log.component.html',
  styleUrls: ['./prescription-log.component.css']
})
export class PrescriptionLogComponent implements OnInit {

  @Input() patientUniqueKey;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
