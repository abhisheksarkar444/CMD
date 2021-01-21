import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Medicine } from '../../dataTypes/Medicine';
import { MedicineCycleOption } from '../../dataTypes/MedicineCycleOption';
import { PrescriptionService } from '../../service/prescription.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentStatusOption } from 'src/app/appointments/dataTypes/AppointmentStatusOption';
import { Appointment } from 'src/app/appointments/dataTypes/Appointment';
import { Prescription } from '../../dataTypes/Prescription';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicineMessageComponent } from '../../text-messages/medicine-message.component';
import { PrescriptionSucccessMessageComponent } from '../../text-messages/prescription-succcess-message.component';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { Notification } from 'src/app/notification/models/notification.model';
import { NotificationType } from 'src/app/notification/models/notificationtype.model';


@Component({
  selector: 'kkd-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {

  @Input() newMedList: Medicine[];
  @Output() newMedListChange = new EventEmitter();
  @Input() patientKey: string;
  @Input() providerKey: string;
  medicineCycleOption = MedicineCycleOption;
  notify: Notification = new Notification();

  precriptionObj: Prescription;
  AddMedicineForm = this.fb.group({
    medName: ['', Validators.required],
    medDur: ['', Validators.required],
    medCycle: [''],
    medIsAfterFood: [false],
    medDesc: ['']
  });
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private prescriptionService: PrescriptionService, public activeModal: NgbActiveModal,
    private _snackBar: MatSnackBar, private notifyService: NotificationService) { }

  ngOnInit() {

  }
  addMedicine() {
    let medicineObj: Medicine = <Medicine>{};
    medicineObj.medicineName = this.AddMedicineForm.controls['medName'].value;
    medicineObj.medicineDuration = this.AddMedicineForm.controls['medDur'].value;
    medicineObj.medicineCycleOption = this.AddMedicineForm.controls['medCycle'].value;
    medicineObj.isAfterFood = this.AddMedicineForm.controls['medIsAfterFood'].value;
    medicineObj.medicineDescription = this.AddMedicineForm.controls['medDesc'].value;
    this.newMedList.push(medicineObj);

  }


  durationInSeconds = 3;
  appointment: Appointment;
  len: number;
  appId: number;
  reasonDesc: string[];

  Confirm() {

    if (this.newMedList.length === 0) {

      this._snackBar.openFromComponent(MedicineMessageComponent, {
        duration: this.durationInSeconds * 1000,
      });
    }
    else {

      this.prescriptionService.getAppointmentsByProviderAndPatientKeyAndStatus(AppointmentStatusOption.Approved, this.providerKey, this.patientKey)
        .subscribe(
          (info => {
            this.len = info.length;
            this.appointment = info[this.len - 1];
            this.prescriptionService.getReasonsByAppointmemtId(this.appointment.appointmentID)
              .subscribe((reasonData) => {
                this.reasonDesc = reasonData;
                let prescriptionObj: Prescription = <Prescription>{};
                prescriptionObj.medicines = this.newMedList;
                prescriptionObj.category = reasonData[0];
                prescriptionObj.createdDate = new Date();
                prescriptionObj.createdBy = this.appointment.providerFirstName;
                this.prescriptionService.AddPrescriptionByAppointmentId(this.appointment.appointmentID, prescriptionObj)
                  .subscribe();

              });
          }));

      this._snackBar.openFromComponent(PrescriptionSucccessMessageComponent, {
        duration: this.durationInSeconds * 1000,
      });
      this.activeModal.dismiss('Cross click');
      this.prescriptionNotification();
    }

  }

  prescriptionNotification() {
    this.notify.receiver_UserID = this.patientKey;
    this.notify.notificationType = new NotificationType();
    this.notify.notificationType.url = "Click to see prescription";
    this.notifyService.SendPrescriptionNotification(this.notify).subscribe();

  }


  public hasError = (controlName: string, errorName: string) => {
    return this.AddMedicineForm.controls[controlName].hasError(errorName);
  }

}
