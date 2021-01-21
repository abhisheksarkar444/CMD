import { Component, OnInit, Input, ElementRef, OnChanges, NgZone } from '@angular/core';
import { AddressBookService } from '../service/address-book.service';
import { DialogCreateBody } from '../dataTypes/dialogCreateBody.type';
import { messagePost } from '../dataTypes/PostMessage.type';
import { PostMessageResponse } from '../dataTypes/PostMessageResponse.type';
import { retreiveMsg } from '../dataTypes/RetriveMessageResponse.type';
import { PrescriptionService } from '../service/prescription.service';
import { PrescriptionComponent } from '../prescription/prescription.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VitalsComponent } from 'src/app/chat-room/vitals/vitals.component';
import { AppointmentStatusOption } from 'src/app/appointments/dataTypes/AppointmentStatusOption';
import { Appointment } from 'src/app/appointments/dataTypes/Appointment';
import { Params } from '../servicetypes/Params';
import { FileAttachService } from '../service/fileattachService';
import { CreateFileInfo } from '../servicetypes/UploadedFileInfo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TextMessageComponent } from '../text-messages/text-message.component';

export interface PatientHistory {
  ProviderName: string;
  ProviderSpeciality: string;
  PatientPreviousHistoryNote: string;
  AppointmentTime: string;
}

declare var QB;
declare var self;
@Component({
  selector: 'kkd-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit, OnChanges {
  @Input() userRole: string;
  @Input() viewAllMsgs: retreiveMsg = <retreiveMsg>{};
  @Input() id: string;
  @Input() other: any;
  @Input() userUniqueKey: string;
  selectedDate: any;
  dialogBody: DialogCreateBody = <DialogCreateBody>{};
  userObj: any;
  msgPost: messagePost = <messagePost>{};
  otherId: string;
  status: number = 1;
  msgPostResponse: PostMessageResponse = <PostMessageResponse>{};
  button: boolean = true;
  attach: boolean = false;
  blobobj: Blob;
  params: string;
  paramsdecoded: string;
  durl: string = "https://api.quickblox.com/blobs/";
  blobId: string;
  paramobj: Params;
  fileUpload: File;
  imageUrl: string;
  durationInSeconds = 5;
  constructor(private service: AddressBookService, private modalService: NgbModal,
    private prescriptionService: PrescriptionService, private zone: NgZone, private fileservice: FileAttachService, private _snackBar: MatSnackBar) {

  }



  displayMsg: boolean = false;
  ngOnInit() {
    if (this.userRole === "Patient") {
      this.otherId = this.other.physicianUniqueKey;
      this.service.getPatientByUniqueKey(this.userUniqueKey).subscribe(obj => {
        this.userObj = obj;
        sessionStorage.setItem('userId', this.userObj.userID)
      });
    }
    else if (this.userRole === "Physician") {
      this.otherId = this.other.patientUniqueKey;
      this.service.getPhysicianByUniqueKey(this.userUniqueKey).subscribe(obj => {
        this.userObj = obj;
        sessionStorage.setItem('userId', this.userObj.userID)
      });

    }
    self = this;


    QB.init(sessionStorage.getItem('QBToken'), 77937);
    QB.login({ login: sessionStorage.getItem('QBUser'), password: sessionStorage.getItem('QBPassword') },
      function (err1, res) {
        if (res) {
          QB.chat.connect({ userId: sessionStorage.getItem('userId'), password: sessionStorage.getItem('QBPassword') },
            function (err2, roster) {
            });
        }

      });
    QB.chat.onMessageListener = this.AnyFunc;

  }
  AnyFunc = (userId, message) => {
    if (this.id == message.dialog_id)
      this.retriveMsgs();
  }

  PendingStatus() {
    this.status = 4;
    this.button = false;

  }

  ngOnChanges() {

    this.ngOnInit();
  }

  showVitals() {
    const modalRef = this.modalService.open(VitalsComponent, { size: 'lg' });
  }
  completedStatus() {
    this.button = true;
    this.status = 1;

  }
  onSelect(msg: any) {

  }
  sendMessage(msg: string) {
    if (msg != "") {
      if (!this.attach) {
        this.msgPost.attachments = {};
      }
      else if (this.attach) {
        this.msgPost.attachments = { "0": { "type": "image", "url": this.blobId } }
        this.attach = false;
      }

      this.displayMsg = true;
      this.msgPost.chat_dialog_id = this.id;
      this.msgPost.message = msg;
      this.msgPost.recipient_id = +this.other.userID;
      this.msgPost.send_to_chat = 1;
      this.msgPost.markable = 1;
      this.service.createMessage(this.msgPost).subscribe(response => {
        this.msgPostResponse = response;

        this.retriveMsgs();
      });

    }
  }
  retriveMsgs() {
    this.displayMsg = false;
    this.service.retrieveMessage(this.id)
      .subscribe(msgs => {
        this.viewAllMsgs = msgs;
      });
  }

  showPrescription() {
    if (this.userRole === "Physician") {
      this.prescriptionService.getAppointmentsByProviderAndPatientKeyAndStatus(AppointmentStatusOption.Approved, this.userUniqueKey, this.other.patientUniqueKey)
        .subscribe(
          (info: Appointment[]) => {
            if (info.length == 0) {
              this._snackBar.openFromComponent(TextMessageComponent, {
                duration: this.durationInSeconds * 1000,
              });
            }
            else {
              const modalRef = this.modalService.open(PrescriptionComponent, { size: 'xl' });
              modalRef.componentInstance.patientKey = this.other.patientUniqueKey;
              modalRef.componentInstance.providerKey = this.userUniqueKey
            }
          });
    }
  }
  onSelectFile(file: FileList) {
    this.attach = true;
    this.fileUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileUpload);

    this.callMethod(this.fileUpload);
  }

  async callMethod(myfile: File) {
    var a = await this.fileservice.createFile().then((data: CreateFileInfo) => {
      return data;
    });

    await this.fileservice.uploadFileMethod(a.Params, myfile).then(() => "success");

    await this.fileservice.declareFileMethod(a.Id).then(() => "success");
    this.durl = this.durl.concat(a.Uid);
    this.blobId = a.Uid;
    this.sendMessage(`${this.durl}`);
  }
}