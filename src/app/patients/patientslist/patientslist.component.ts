import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { PatientService } from 'src/app/patients/services/patient.service';
import { AuthService } from 'src/app/shared/services/AuthService';
@Component({
  selector: 'kkd-patientslist',
  templateUrl: './patientslist.component.html',
  styleUrls: ['./patientslist.component.css']
})

export class PatientslistComponent implements OnInit {

  searchText: string;   //For SearchName in SearchBar
  p: number = 1;     //For Pagination
  collection: any[] = [];
  fetchingQuotes = false;   //This is used for the loading Symbol on the page.

  constructor(private patientService: PatientService, private auth: AuthService) { }
  ngOnInit() {   
    this.fetchingQuotes = true;
    //This method is called to get the List of Approved Appointments by passing the ProviderUniqueKey from Authentication by loginUserID        
        this.patientService.getAllPatients().subscribe(patients => {
            this.collection=patients;   
            console.log("getting collection value as");
            console.log(this.collection);
            this.fetchingQuotes = false;
    });
    this.fetchingQuotes = false;
  }

}