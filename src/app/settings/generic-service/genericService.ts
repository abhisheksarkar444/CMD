import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question, Category } from '../generic-entities/question';
import { UrlService } from 'src/app/shared/services/url.service';
import { AuthService } from 'src/app/shared/services/AuthService';

@Injectable({ providedIn: 'root' })
export class GenericService {

  constructor(private http: HttpClient, private urls: UrlService, private authSvc: AuthService) { }

  apiUrl = `${this.urls.teleAppointmentLocalApi}`;
  httpHeaders = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': this.authSvc.authorizationHeaderValue
    })
  };

  // api code goes here
  public getAllCategoriesById(id: string): Observable<Question[]> {

    const url = `${this.apiUrl}api/GenericQuestions/GetCategoriesByProviderUniqueKey/${id}`;
    // const url = `http://localhost:60158/api/GenericQuestions/GetCategoriesByProviderUniqueKey/${id}`;
    return this.http.get<Question[]>(url, this.httpHeaders);
  }

  public SaveUnsavedQuestionsToDB(questionArray: Question[]) {

    const url = `${this.apiUrl}api/GenericQuestions/AddQuestion`;
    //const url = `http://localhost:60158/api/GenericQuestions/AddQuestion`;
    console.log("eothuohego");
    console.log("adding to db", questionArray);

    this.http.post(url, questionArray, this.httpHeaders).subscribe((response) => {
      console.log(response);
    });
  }

  public SaveNewCategory(value: Category): Observable<Category> {
    const url = `${this.apiUrl}api/GenericQuestions/AddQuestionCategory`;
    //const url = 'http://localhost:60158/api/GenericQuestions/AddQuestionCategory';
    return this.http.post<Category>(url, value, this.httpHeaders);
  }
}
