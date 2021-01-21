import { Component, OnInit, Input } from '@angular/core';
import { PrescriptionService } from '../../service/prescription.service';
import { Medicine } from '../../dataTypes/Medicine';

@Component({
  selector: 'kkd-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {

  @Input() newMedList: Medicine[];
  imgPath: string;
  constructor(private prescriptionService: PrescriptionService) {
  }

  ngOnInit() {

  }

  SetImagePath(med: number) {
    if (med == 1) {
      this.imgPath = "../../../../assets/medlistImages/1-1-1.svg";
    }
    else if (med == 2) {
      this.imgPath = "../../../../assets/medlistImages/1-0-1.svg";
    }
    else if (med == 3) {
      this.imgPath = "../../../../assets/medlistImages/1-1-0.svg";
    }
    else if (med == 4) {
      this.imgPath = "../../../../assets/medlistImages/0-1-1.svg";
    }
    else if (med == 5) {
      this.imgPath = "../../../../assets/medlistImages/1-0-0.svg";
    }
    else if (med == 6) {
      this.imgPath = "../../../../assets/medlistImages/0-1-0.svg";
    }
    else if (med == 7) {
      this.imgPath = "../../../../assets/medlistImages/0-0-1.svg";
    }
  }

  Cancel(medName: string) {
    console.log("id" + medName);
    let count = 0;
    for (let i = 0; i < this.newMedList.length; i++) {
      if (this.newMedList[i].medicineName == medName) {
        break;
      }
      else {
        count++;
        console.log("count" + count);
      }
    }
    this.newMedList.splice(count, 1);
    console.log("Cancel btn ");
  }

}
