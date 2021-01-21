import { Component, OnInit } from '@angular/core';
import { SessionToken } from '../dataTypes/sessionToken.type';
import { AddressBookService } from '../service/address-book.service';
import { Patient } from '../dataTypes/Patients.type';
import { DialogCreateBody } from '../dataTypes/dialogCreateBody.type';
import { Dialog } from '../dataTypes/dialog';
import { messagePost } from '../dataTypes/PostMessage.type';
import { retreiveMsg } from '../dataTypes/RetriveMessageResponse.type';
import { PostMessageResponse } from '../dataTypes/PostMessageResponse.type';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/AuthService';
import { physician } from '../dataTypes/physician.type';



export interface Status {
  value: string;
  viewValue: string;
}
export interface UserList {
  UserName: string;
  LastSeen: string;
  Status: string;
}
export interface UpdatedUserList {
  name: string;
  phone: string;
}


@Component({
  selector: 'kkd-chat-landing-page',
  templateUrl: './chat-landing-page.component.html',
  styleUrls: ['./chat-landing-page.component.css']
})
export class ChatLandingPageComponent implements OnInit {
  session: SessionToken = <SessionToken>{};
  userRole: string;
  userUniqueKey: string;
  userName: string;
  tempUser: any;

  constructor(private service: AddressBookService, private http: HttpClient,
    private authService: AuthService) {

    this.userRole = this.authService.getuserRole();
    this.userUniqueKey = this.authService.getuserUniqueId();
    this.userName = this.authService.name;

    if (this.userRole === "Physician") {
      this.userName = "Dr." + this.userName;
      this.service.getPhysicianByUniqueKey(this.userUniqueKey).subscribe(p => this.tempUser = p)

    }
    else {
      this.tempUser = this.service.getPatientByUniqueKey(this.userUniqueKey).subscribe(p => this.tempUser = p)
    }

  }

  isPatient: boolean;
  queryField: FormControl = new FormControl();
  others: any;
  other: any;
  otherbackup: any;
  userOnlineArray: string[] = [];
  storedArray: string[];
  ngOnInit() {


    this.storedArray = JSON.parse(sessionStorage.getItem("onlineUsers"));//no brackets
    if (this.userRole === "Physician") {
      this.isPatient = false;
      this.service.getAllPatient().subscribe(x => {
        this.others = x; this.otherbackup = x;
        this.service.getPhysicianByUniqueKey(this.userUniqueKey).subscribe(p => this.tempUser = p)
      });
      this.queryField.valueChanges
        .subscribe(queryField => this.getSearchedItem(queryField));
    }
    else if (this.userRole === "Patient") {
      this.isPatient = true;
      this.service.getAllphysician().subscribe(x => {
        this.others = x;
        this.otherbackup = x;
        this.tempUser = this.service.getPatientByUniqueKey(this.userUniqueKey).subscribe(p => this.tempUser = p)

      });
      this.queryField.valueChanges
        .subscribe(queryField => this.getSearchedItem(queryField));
    }

  }
  getSearchedItem(queryField: string) {
    if (this.userRole === "Patient") {
      let temp: Patient[] = [];
      if (queryField !== "") {
        this.others.forEach(element => {
          if ((element.firstName).toLowerCase().includes(queryField.toLowerCase())) {
            temp.push(element);
          }
        });
        this.others = temp;
      }
      else {
        this.others = this.otherbackup;
      }
    }
    else if (this.userRole === "Physician") {
      let temp: physician[] = [];
      if (queryField !== "") {
        this.others.forEach(element => {
          if ((element.firstName).toLowerCase().includes(queryField.toLowerCase())) {
            temp.push(element);
          }
        });
        this.others = temp;
      }
      else {
        this.others = this.otherbackup;
      }
    }
  }

  BlankChat: boolean = true;
  UserChat: boolean = false;
  dialogBody: DialogCreateBody = <DialogCreateBody>{};
  dialogResponseBody: Dialog = <Dialog>{};
  msgPost: messagePost = <messagePost>{};
  viewAllMsgs: retreiveMsg = <retreiveMsg>{};
  msgs: string;
  msgPostResponse: PostMessageResponse;

  userHistory(item: any) {
    this.BlankChat = false;
    this.UserChat = true;
    this.other = item;
    this.dialogBody.type = 3;
    this.dialogBody.occupants_ids = this.other.userID;
    this.service.createDialog(this.dialogBody).subscribe(res => {
      this.dialogResponseBody = res;
      this.retriveMsgs(res._id);
    });
  }

  retriveMsgs(diaglogId: string) {
    this.service.retrieveMessage(diaglogId)
      .subscribe(msgs => {
        this.viewAllMsgs = msgs;
      });

  }
}