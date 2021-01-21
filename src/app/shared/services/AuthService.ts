import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BehaviorSubject, Observable, from, ReplaySubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { LoggedUser } from '../types/loggedinuser';
import { QuickBloxService } from './QuickBloxService';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressBookService } from 'src/app/Chats/service/address-book.service';
import { currentUser, emptyToken, QBToken } from 'src/External Service Json/user-data';
import { LoginUser } from '../types/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private manager = new UserManager(getClientSettings());
  private user: User | null;
  response: LoggedUser;

  isLoggedIn: boolean;

  httpHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) };

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.isLoggedIn = this.currentUserSubject.value !== null;
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private currentUserSub: BehaviorSubject<User> = new BehaviorSubject<User>(JSON.parse(JSON.stringify(currentUser)));
  public get currentUserValue(): User {
    if(this.isLoggedIn){
      return this.currentUserSub.value;
    }
  }

  loggeduser: LoggedUser;
  QBToken: string;

  loginIdentity() {
    return this.manager.signinRedirect();
  }

  login(formData: LoginUser) {
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    sessionStorage.setItem('QBToken', JSON.stringify(QBToken));
    sessionStorage.setItem('QBUser', JSON.stringify(formData.username));
    sessionStorage.setItem('QBPassword', JSON.stringify(formData.password));
    this.router.navigate(["/dashboard"]);
    location.reload();
  }


  async completeAuthentication() {
    this.user = await this.manager.signinRedirectCallback();

    sessionStorage.setItem('currentUser', JSON.stringify(this.user));
    this.currentUserSubject.next(this.user);
    await this.init();
    this._authNavStatusSource.next(this.isAuthenticated());
  }

  async init() {
    let qbService = new QuickBloxService(this.http, this.currentUserValue.profile.email, "Password@123");
    await qbService.getQBToken().then((value) => this.QBToken = value);

    setTimeout(() => {
    }, 5000);
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  get authorizationHeaderValue(): string {
    return `${this.currentUserValue.token_type + " " + this.currentUserValue.access_token}`;
  }

  get name(): string {
    return this.currentUserValue != null ? this.currentUserValue.profile.name : '';
  }

  getuserUniqueId(): string {
    return this.currentUserValue != null ? this.currentUserValue.profile.UserUniqueID : "null";
  }

  getuserRole() {
    return this.currentUserValue != null ? this.currentUserValue.profile.Role : "null";
  }

  getQBToken() {
    return sessionStorage.getItem('QBToken');
  }

  getUserName() {
    return this.currentUserValue.profile.email;
  }

  signout() {
    this.isLoggedIn = false;
    if (this.currentUserValue != null) {
      let addressBookService = new AddressBookService(this.http);
      addressBookService.PopUserIdFromListAfterSignOut(this.currentUserValue.profile.UserUniqueID);
    }
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('QBToken');
    this.currentUserSub.next(JSON.parse(JSON.stringify(emptyToken)));
    this.router.navigate(["/login"]);
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    //---Local host--//
    authority: 'http://localhost:63590/',
    client_id: 'angular_spa', 
    redirect_uri: 'http://localhost:4200/auth-callback',
    response_type: "id_token token",
    scope: "openid profile email api.read"

    //--Production--//
  };
}