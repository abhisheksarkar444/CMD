import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';
import { AuthService } from 'src/app/shared/services/AuthService';



@Injectable({
    providedIn: "root"
})
export class NotificationService {
    not: Notification[] = [];

    httpHeaders = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.authService.authorizationHeaderValue
        })
    };

    url = 'http://172.30.11.7:8324/';
    constructor(private http: HttpClient, private authService: AuthService) { }

    //Notification Service Api's
    //Service to get All Notification from Existing service
    public GetAllNotification(userId: string): Observable<Notification[]> {
        return this.http.get<any>(this.url + 'api/Notification/GetAllNotifications?id=' + userId);
    }
    //Service to get All Notification Async from Existing Service
    public GetAllNotificationAsync(userId: string): Observable<Notification[]> {
        return this.http.get<any>(this.url + 'api/Notification/GetAllNotificationsAsync?id=' + userId);
    }

    //Service to get All Prescription for a user from Existing Service
    public GetPrescriptionNotification(userId: string): Observable<Notification[]> {
        return this.http.get<any>(this.url + 'api/Notification/GetPrescriptionNotifications?id=' + userId);
    }

    //Service to get All Appoinments Notification for a user from Existing Service
    public GetAppointmentNotification(userId: string): Observable<Notification[]> {
        return this.http.get<any>(this.url + 'api/Notification/GetAppointmentNotifications?id=' + userId);
    }

    //Service to send Prescription Notification to the user
    public SendPrescriptionNotification(notification: Notification): Observable<string> {
        return this.http.post<any>(this.url + 'api/Notification/SendPrescriptionSentNotification', notification);
    }

    //Service to send notification if Appointment is successfully mande
    public SendNotificationIfAppointmentSuccess(notification: Notification): Observable<string> {
        return this.http.post<any>(this.url + 'api/Notification/SendAppointMentNotificationIfMadeAppointMent', notification);
    }

    //Service to send notification if Appointmnet is Denied
    public SendNotificationIfAppointmentDenied(notification: Notification): Observable<string> {
        return this.http.post<any>(this.url + 'api/Notification/SendAppointMentNotificationIfDenied', notification);
    }

    //Service to get Notification if Already Booked slot is clicked
    public GetNotificationIfAlreadyBooked(): Observable<string> {
        return this.http.get<any>(this.url + '/api/Notification/AppointmentAlreadyBooked')
    }

    //Service to get notification if Feedback is Submitted
    public GetNotificationIfFeedbackSubmitted(): Observable<string> {
        return this.http.get<any>(this.url + '/api/Notification/FeedbackSubmitNotification')
    }
}
