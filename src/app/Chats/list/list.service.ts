import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FeedBack } from './feedback';
import { UrlService } from 'src/app/shared/services/url.service';
import { AuthService } from 'src/app/shared/services/AuthService';
@Injectable({
  providedIn: 'root'
})
export class ListService {


  constructor(private http: HttpClient, private authSvc: AuthService, private urls: UrlService) { }

  apiUrl = `${this.urls.teleAppointmentLocalApi}`;
  httpHeaders = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': this.authSvc.authorizationHeaderValue
    })
  };
  baseUrl: string = `${this.apiUrl}api/Feedback`;
  public logFeedBack(feedback: FeedBack) {
    this.http.post(this.baseUrl, feedback, this.httpHeaders).subscribe(data => console.log(data));
  }
}
