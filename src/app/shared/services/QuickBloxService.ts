import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionToken } from 'src/app/Chats/dataTypes/sessionToken.type';
import { User } from 'src/app/Chats/dataTypes/loginUser.type';
import { tap } from 'rxjs/operators';
import { QuickBloxModel } from '../types/quickBlox.type';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class QuickBloxService {
  timestamp: number;
  nonce: number;
  appSingnature: string;
  userSignature: string;
  data: QuickBloxModel;
  url: UrlService;
  httpOptionsForOurOwnServices =
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('currentUser')).id_token
      }),
    };
  constructor(private http: HttpClient, private user: string, private password: string) {
    this.url = new UrlService();
    this.init();

  }
  async init() {
    await this.getDataForQBTokenFromBackend(this.user, this.password).then(
      (x: QuickBloxModel) => {
        this.data = x;
        console.log("Data from backed: " + x);
        let sessionTokenBody: any = {
          "application_id": 77937, "auth_key": "U4OVVAqgm8-yykX",
          "timestamp": x.timeStamp, "nonce": x.nonce, "signature": x.appSignature
        }

        this.getSessionToken(sessionTokenBody).subscribe(() => {
          let userTokenBody: any = {
            "application_id": 77937, "auth_key": "U4OVVAqgm8-yykX",
            "timestamp": x.timeStamp, "nonce": x.nonce + 1, "signature": x.userSignature,
            "user": { "login": this.user, "password": this.password }
          }
          this.getUserToken(userTokenBody).then(({ session }: { session: SessionToken }) => {
            console.log("user token object" + session.token);
            this.tokenString = session.token;
            this.UserLogin(this.user, this.password);
          });
        });
      }
    )
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'QuickBlox-REST-API-Version': '0.1.0'
    }),
  };
  token: SessionToken;
  tokenString: string;
  getSessionToken(sessionTokenBody: any): Observable<SessionToken> {
    let url = "https://api.quickblox.com/session.json";
    return this.http.post<SessionToken>(url, sessionTokenBody, this.httpOptions).pipe(tap(() => console.log('O Backend is working fine for Session Token!!')));
  }
  async getUserToken(userTokenBody: any): Promise<any> {
    let url = "https://api.quickblox.com/session.json";
    return this.http.post(url, userTokenBody, this.httpOptions).pipe(tap(() => console.log('O Backend is working fine for User Token!!'))).toPromise();
  }
  UserLogin(username: string, password: string): Observable<User> {
    let userLoginBody: any = { "login": username, "password": password };
    let httpOptionsForUserLogin = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'QuickBlox-REST-API-Version': '0.1.0',
        'QB-Token': this.tokenString
      }),
    };

    let url = "https://api.quickblox.com/login.json";
    console.log("user logging in:  " + this.tokenString);
    sessionStorage.setItem('QBToken', this.tokenString);
    console.log("Inside QuickBlox Login username and pasword:  " + username + "   " + password);
    console.log("Inside Quickblox login getting from seessions:  " + sessionStorage.getItem('QBToken'));
    return this.http.post<User>(url, userLoginBody, httpOptionsForUserLogin).pipe(tap(() => console.log('O Backend is working fine for User login !!')));
  }
  async getDataForQBTokenFromBackend(username: string, password: string): Promise<QuickBloxModel> {
    const url = `${this.url.identityLocalApi}` + `Quickblox/getAll?username=${username}&password=${password}`;
    sessionStorage.setItem('QBUser', this.user)
    sessionStorage.setItem('QBPassword', this.password)

    return this.http.get<QuickBloxModel>(url, this.httpOptionsForOurOwnServices).toPromise();
  }
  async getQBToken(): Promise<string> {

    return new Promise((resolve, reject) => {
      resolve(this.tokenString);
    });
  }

  getUserName(): string {
    return this.user;
  }

  getPassword(): string {
    return this.password;
  }


}