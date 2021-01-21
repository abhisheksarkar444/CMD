import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PatientappointmentStepperComponent } from '../patientappointment-stepper.component';
import { Appointment } from 'src/app/appointments/dataTypes/Appointment';
import { AuthService } from 'src/app/shared/services/AuthService';
import { PatientService } from 'src/app/patients/services/patient.service';
import { AppointmentStatusOption } from 'src/app/appointments/dataTypes/AppointmentStatusOption';

@Component({
  selector: 'kkd-patientappointmentstep1',
  templateUrl: './newappointmentstep1.component.html',
  styleUrls: ['./newappointmentstep1.component.css']
})
export class PatientAppointmentstep1Component implements OnInit {

  @Input() parent: PatientappointmentStepperComponent;
  @Input() Appointment: Appointment;
  @Output() AppointmentChange = new EventEmitter();
  Role: string;
  UniqueId: string;
  UserList: any[] = [];
  proceed: boolean;
  choose: string;

  constructor(private service: AuthService, private proService: PatientService) { }

  ngOnInit() {
    this.proceed = false;
    this.Role = this.service.getuserRole();
    this.UniqueId = this.service.getuserUniqueId();

    if (this.Role == "Patient") {
      this.choose = "Choose Doctor";
      this.Appointment.patientUniqueKey = this.service.getuserUniqueId();
      this.proService.getPatientByUniqueId(this.Appointment.patientUniqueKey).subscribe(patient => {
        this.Appointment.memberFirstName = patient.firstName;
        this.Appointment.memberLasttName = patient.lastName;
        this.Appointment.memberMiddleName = patient.middleName;
      })
      this.proService.getAllPhysicians().subscribe(phy => { this.UserList = phy; });
    }
    else if (this.Role == "Physician") {
      this.choose = "Choose Patient";
      this.Appointment.providerUniqueKey = this.service.getuserUniqueId();
      this.proService.getProviderByUniqueId(this.Appointment.providerUniqueKey).subscribe(provider => {
        this.Appointment.providerFirstName = provider.firstName;
        this.Appointment.providerLastName = provider.lastName;
        this.Appointment.providerMiddleName = provider.middleName;
      })
      this.proService.getAllPatients().subscribe(pat => { this.UserList = pat; });
    }
  }

  onChange(user) {
    this.proceed = true;

    if (this.Role == 'Patient') {
      this.Appointment.providerUniqueKey = user.physicianUniqueKey;
      this.Appointment.appointmentStatusOption = AppointmentStatusOption.Requested;
      this.proService.getProviderByUniqueId(user.physicianUniqueKey).subscribe(provider => {
        this.Appointment.providerFirstName = provider.firstName;
        this.Appointment.providerLastName = provider.lastName;
        this.Appointment.providerMiddleName = provider.middleName;
      })
    }
    else if (this.Role == 'Physician') {
      this.Appointment.patientUniqueKey = user.patientUniqueKey;
      this.Appointment.appointmentStatusOption = AppointmentStatusOption.Approved;
      this.proService.getPatientByUniqueId(user.patientUniqueKey).subscribe(patient => {
        this.Appointment.memberFirstName = patient.firstName;
        this.Appointment.memberLasttName = patient.lastName;
        this.Appointment.memberMiddleName = patient.middleName;
      })
    }
  }
}
