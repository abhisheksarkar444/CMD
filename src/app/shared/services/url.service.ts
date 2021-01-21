import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  //localAppBaseUrl = "http://172.30.11.7:8326/";
  //deployedAppBaseUrl = "http://172.30.11.7:8321/";
  localAppBaseUrl = "http://localhost:4200/";
  deployedAppBaseUrl = "http://localhost:63590/";

  // teleAppointmentAzureApi: string = "http://172.30.11.7:8320/";
  // profileAzureApi: string = "http://172.30.11.7:8325/";
  // notificationAzureApi: string = "http://172.30.11.7:8324/ ";
  // identityAzureApi: string = "http://172.30.11.7:8322/";

  // teleAppointmentAzureApi: string = "http://localhost:59533/appointment/";
  // profileAzureApi: string = "http://localhost:59533/profile/";
  // notificationAzureApi: string = "http://localhost:59533/notification/";
  // identityAzureApi: string = "http://localhost:63590/";

  teleAppointmentLocalApi: string = "http://219.65.96.171:9083/";
  profileLocalApi: string = "http://219.65.96.171:9082/";
  notificationLocalApi: string = "http://219.65.96.171:9081/";
  identityLocalApi: string = "http://localhost:63590/";

  // teleAppointmentLocalApi: string = "http://172.30.11.7:8320/";
  // profileLocalApi: string = "http://172.30.11.7:8325/";
  // notificationLocalApi: string = "http://172.30.11.7:8324/";
  // identityLocalApi: string = "http://172.30.11.7:8321/";


  constructor() { }
}
