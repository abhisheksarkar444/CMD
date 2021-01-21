import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'kkd-viewpatient',
  templateUrl: './viewpatient.component.html',
  styleUrls: ['./viewpatient.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewpatientComponent implements OnInit {
  ApID: number;
  id: any;
  jsonpatientt: any;
  insuredPerson: any;
  uuidpatient: any;
  patientObject: any;
  MemberObj: Member = new Member();
  insuredPersonObj: insuredPerson = new insuredPerson();

  constructor(private route: ActivatedRoute, private patientService: PatientService) { }

  ngOnInit() {
    this.route.params.subscribe(info => {
      this.id = info.id;
      this.patientService.getPatientById(this.id).subscribe(patients => {
        this.jsonpatientt = patients;

        this.patientService.getPatientInfoById(this.jsonpatientt.patientUniqueKey).subscribe(
          patt => {
            this.uuidpatient = patt;
            this.MemberObj = this.uuidpatient;
            this.insuredPersonObj = this.uuidpatient;
          });
      })
    });
  }

  currentlyOpenedItemIndex = -1;

  setOpened(itemIndex) {
    this.currentlyOpenedItemIndex = itemIndex;
  }

  setClosed(itemIndex) {
    if (this.currentlyOpenedItemIndex === itemIndex) {
      this.currentlyOpenedItemIndex = -1;
    }

  }

  onAppSelected(id1: any) {
    //fetching the id which is selected and then this ApID will go to child component
    this.ApID = id1;
  }

}


export class Member {
  county: any;
  dateOfBirth: any;
  firstName: any;
  gender: any;
  isSubscriber: any;
  lastName: any;
  memberProfileId: any;
  middleName: any;
  personId: any;
  uniqueMemberID: any;
  uuid: any;
}
export class insuredPerson {
  county: any;
  insuranceCompanyCode: any;
  insuranceCompanyName: any;
  insuredMembershipId: any;
  isSubscriber: any;
  planCode: any;
  planEffectiveDate: any;
  planName: any;
  planPreference: any;
  planTerminationDate: any;
  subscriberID: any;
  subscriberProfileId: any;
  uniqueMemberID: any;
  lastName: any;
}
export class otherInsuredPerson {

}