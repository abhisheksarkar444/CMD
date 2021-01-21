import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PatientappointmentStepperComponent } from '../Appointment-stepper/patientappointment-stepper.component';
import { QuestionCategory } from '../../dataTypes/category';
import { Question } from '../../dataTypes/Question';
import { AppointmentAnswer } from '../../dataTypes/AppointmentAnswer';
import { Appointment } from '../../dataTypes/Appointment';
import { AppointmentService } from '../../service/appointment.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification/services/notification.service';
import { Notification } from 'src/app/notification/models/notification.model';
import { NotificationType } from 'src/app/notification/models/notificationtype.model';
import { UrlService } from 'src/app/shared/services/url.service';

@Component({
  selector: 'kkd-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  id: number;
  categories: QuestionCategory[] = [];
  questions: Question[] = [];
  currentQuestion: any;
  questionCount: number = 0;
  selectedAnswers = AppointmentAnswer;
  @Input() parent: PatientappointmentStepperComponent;
  @Input() Appointment: Appointment;
  @Output() AppointmentChange = new EventEmitter();
  @Input() catId: number;
  customtext: string;
  CanSaveAppointment: boolean = false;
  notification: Notification = new Notification();

  constructor(private service: AppointmentService, private router: Router, private notificationservice: NotificationService, private urlService: UrlService) {
  }

  ngOnInit() {
    this.service.getQuestionsByCategory(this.catId).subscribe(questions => {
      this.questions = questions;
      this.currentQuestion = this.questions[0];
    })

    this.service.getAllCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  selectAnswer(selectedHint: any) {
    let result = this.Appointment.answers.some(x => x.questionID == this.currentQuestion.questionID);
    if (!result) {
      let answer = new AppointmentAnswer(0, true, selectedHint.description, this.currentQuestion.questionID);
      this.Appointment.answers.push(answer);
    }
  }

  previousQuestion() {
    if (this.questionCount > 0) {
      this.currentQuestion = this.questions[--this.questionCount];
    }
  }

  nextQuestion() {
    if (!this.CanSaveAppointment) {
      let result = this.Appointment.answers.some(x => x.questionID == this.currentQuestion.questionID);
      if (!result) {
        let answer: AppointmentAnswer = new AppointmentAnswer(0, true, this.customtext, this.currentQuestion.questionID);
        this.Appointment.answers.push(answer);
      }

      if (this.questionCount < this.questions.length - 1) {
        this.currentQuestion = this.questions[++this.questionCount];
      }
      else {
        this.CanSaveAppointment = true;
      }
    }
    this.customtext = "";
  }

  skipQuestion() {
    if (!this.CanSaveAppointment) {
      if (this.questionCount < this.questions.length - 1) {
        this.currentQuestion = this.questions[++this.questionCount];
      }
      else {
        this.CanSaveAppointment = true;
      }
    }
    this.customtext = "";
  }

  saveAppointment() {
    this.service.addAppointment(this.Appointment).subscribe(appointmentID => {
      this.id = appointmentID;
      this.notification.receiver_UserID = this.Appointment.patientUniqueKey;
      this.notification.notificationType = new NotificationType();
      this.notification.notificationType.url = `${this.urlService.deployedAppBaseUrl}appointmentConfirmaton/${this.id}`;
      this.notificationservice.SendNotificationIfAppointmentSuccess(this.notification).subscribe();
      this.router.navigate([`appointementConfirmaton/${this.id}`])
    });
  }
}