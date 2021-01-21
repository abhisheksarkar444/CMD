import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../dataTypes/Appointment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kkd-appointmentconfirmation',
  templateUrl: './appointmentconfirmation.component.html',
  styleUrls: ['./appointmentconfirmation.component.css']
})
export class AppointmentconfirmationComponent implements OnInit {
  id: number;
  Appointment: Appointment;

  constructor(private service: AppointmentService, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.service.getAppointmentById(this.id).subscribe(appointment => {
        this.Appointment = appointment;
        console.log(this.Appointment);
      });
    })
  }

  openPrescription(PrescriptionList) {
    this.modalService.open(PrescriptionList);
  }
}