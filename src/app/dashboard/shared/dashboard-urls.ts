import { NgModule } from '@angular/core';

@NgModule()
export class DashboardUrls {

  getAppointmentsByProviderUniqueKey: string = "api/Appointment/GetAllAppointmentByProviderUniqueKey/";
  getAppointmentsByPatientUniqueKey: string = "api/Appointment/GetAllAPpointmentsByPatientUniqueKey/";
  getPatientByUniqueId: string = "api/Patient/GetPatientByUniqueKey?patientUniqueKey=";
  getPhysicianById: string = "api/Physician/GetPhysicianById/";
  getLatestAptByPttUnqKey: string = "api/Appointment/GetGetLatestAppointmentsHavingPrescriptionByPatientUniqueKey/";
  getPrevAptsByPttUnqKey: string = "api/Appointment/GetAllPreviousAppointmentsHavingPrescriptionByPatientUniqueKey/";
}
