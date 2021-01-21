import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/AuthService';
import { UrlService } from 'src/app/shared/services/url.service';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingService {
  httpHeaders: any = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
    })
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(
    private http: HttpClient,
    private authSvc: AuthService,
    private urls: UrlService,
  ) { }

  postImage(pUniqueId: string, fileToUpload: File) {
    const endpoint = `${this.urls.profileLocalApi}api/Physician/UploadImage`;
    const formData: FormData = new FormData();
    formData.append('physicianUniqueKey', pUniqueId);
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, this.httpHeaders);

  }

  getProfileDetails(key: string): Observable<any> {
    let Url = `${this.urls.profileLocalApi}api/Physician/GetPhysicians/${key}`;
    return this.http.get<any>(Url, this.httpHeaders);
  }

}