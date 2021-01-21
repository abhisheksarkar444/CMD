import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionToken } from '../dataTypes/sessionToken.type';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Dialog } from '../dataTypes/dialog';
import { DialogCreateBody } from '../dataTypes/dialogCreateBody.type';
import { PostMessageResponse } from '../dataTypes/PostMessageResponse.type';
import { messagePost } from '../dataTypes/PostMessage.type';
import { retreiveMsg } from '../dataTypes/RetriveMessageResponse.type';
import { Patient } from '../dataTypes/Patients.type';
import { physician } from '../dataTypes/physician.type';
import { UrlService } from 'src/app/shared/services/url.service';
@Injectable({
  providedIn: 'root'
})
export class AddressBookService {
  token: SessionToken;
  tokenString: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'QuickBlox-REST-API-Version': '0.1.0'
    }),
  };

  httpOptionsForAddressBook = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'QB-Token': sessionStorage.getItem('QBToken')
    }),
  };

  httpOptionsForOurOwnServices =
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  url: UrlService;
  appToken: string;
  sessionTokenBody: any = { "application_id": 77912, "auth_key": "rVvzz9uYzBnWNa6", "timestamp": 1563971283, "nonce": 55555, "signature": "ed47dae21f943e6961484fa7e2c20d5e746589df" }
  userTokenBody: any = { "application_id": 77912, "auth_key": "rVvzz9uYzBnWNa6", "timestamp": 1563971283, "nonce": 88888, "signature": "4bcc980339c5c1c2a9e4395bc28aa17331013058", "user": { "login": "jimin@jimin.com", "password": "password@123" } }
  userLoginBody: any = { "login": "jimin@jimin.com", "password": "password@123" };
  constructor(private http: HttpClient) {
    this.url = new UrlService();
  }
  getProviderUser(uniqueKey: string): Observable<physician> {
    let url = `${this.url.profileLocalApi}` + `api/Physician${uniqueKey}`;
    return this.http.get<physician>(url, this.httpOptionsForOurOwnServices).pipe(tap(() => console.log("get provider by unique key")));
  }
  getPatientUser(uniqueKey: string): Observable<Patient> {
    let url = `${this.url.profileLocalApi}` + `api/Patient/GetPatientByUniqueKey?patientUniqueKey=${uniqueKey}`;
    return this.http.get<Patient>(url, this.httpOptionsForOurOwnServices).pipe(tap(() => console.log("get provider by unique key")));
  }
  getPatientByUniqueKey(uniqueKey: string): Observable<Patient> {
    let url = `${this.url.profileLocalApi}` + `api/Patient/GetPatientByUniqueKey?patientUniqueKey=${uniqueKey}`;
    return this.http.get<Patient>(url, this.httpOptionsForOurOwnServices).pipe(tap(() => console.log("get patient by unique id is working")))
  }
  getPhysicianByUniqueKey(uniqueKey: string): Observable<physician> {
    let url = `${this.url.profileLocalApi}` + `api/Physician/GetPhysicianById/${uniqueKey}`;
    return this.http.get<physician>(url, this.httpOptionsForOurOwnServices).pipe(tap(() => console.log("get physician by unique key")))
  }
  getAllPatient(): Observable<Patient[]> {
    const url = `${this.url.profileLocalApi}` + 'api/Patient/GetAllPatients';
    return this.http.get<Patient[]>(url, this.httpOptionsForOurOwnServices).pipe(tap(() =>
      console.log("Getting all the Patient details from the json server")));
  }
  getAllphysician(): Observable<physician[]> {
    const url = `${this.url.profileLocalApi}` + 'api/Physician/GetAllPhysicians';
    return this.http.get<physician[]>(url, this.httpOptionsForOurOwnServices).pipe(tap(() =>
      console.log("Getting all the physician details from the json server")));
  }
  createDialog(body: DialogCreateBody): Observable<Dialog> {
    let url = "https://api.quickblox.com/chat/Dialog.json";
    return this.http.post<Dialog>(url, body, this.httpOptionsForAddressBook).pipe(tap(() => console.log('O Backend is working fine for create Dialog!!')));
  }
  createMessage(body: messagePost): Observable<PostMessageResponse> {
    // console.log(body.message);
    let url = "https://api.quickblox.com/chat/Message.json";
    return this.http.post<PostMessageResponse>(url, body, this.httpOptionsForAddressBook).pipe(tap(() => console.log('O Backend is working fine for createMessage !!')));
  }
  retrieveMessage(chat_dialog_id: string): Observable<retreiveMsg> {
    let url = `https://api.quickblox.com/chat/Message.json?chat_dialog_id=${chat_dialog_id}`;
    return this.http.get<retreiveMsg>(url, this.httpOptionsForAddressBook).pipe(tap(() => console.log('O Backend is working fine for retrieveMessage!!')));
  }

  postUserUniqueKey(userUniqueKey: string): void {
    let url = `${this.url.profileLocalApi}` + `api/Master/SendUserUniqueKey?userUniqueKey=${userUniqueKey}`;
    this.http.get<void>(url, this.httpOptionsForOurOwnServices).pipe(tap(() => console.log('Unique Key is Being Sent!!'))).subscribe();
  }

  getAllOnlineUsers(): Observable<string[]> {
    let url = `${this.url.profileLocalApi}` + 'api/Master/getAllOnlineUsers';
    return this.http.get<string[]>(url, this.httpOptionsForOurOwnServices).pipe(tap(() => console.log('O Backend is working fine for getAllOnlineUsers!!')));
  }
  PopUserIdFromListAfterSignOut(userUniqueKey: string): void {
    let url = `${this.url.profileLocalApi}` + `api/Master/PopUserIdFromListAfterSignOut?userUniqueKey=${userUniqueKey}`;
    this.http.get<void>(url, this.httpOptionsForOurOwnServices).pipe(tap(() => console.log('O Backend is working fine for PopUserIdFromListAfterSignOut!!'))).subscribe();
  }
}