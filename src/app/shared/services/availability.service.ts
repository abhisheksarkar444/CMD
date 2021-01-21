import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from './AuthService';
import { UrlService } from './url.service';


@Injectable({ providedIn: 'root' })
export class AvailabilityService {
    constructor(private http: HttpClient, private auth: AuthService, private urls: UrlService) { }

    baseApiUrl = `${this.urls.profileLocalApi}`;

    httpHeaders = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    availabilityData: [] = [];

    public get() {
        let id = this.auth.getuserUniqueId();

        return this.http.get(`${this.baseApiUrl}api/PhysicianSchedule/Get/ByKey/${id}`, this.httpHeaders);
    }

    public post(availability) {
        let id = this.auth.getuserUniqueId();
        return this.http.post(`${this.baseApiUrl}api/PhysicianSchedule/Post`, { 'availability': availability, 'key': id }, this.httpHeaders);
    }
}
