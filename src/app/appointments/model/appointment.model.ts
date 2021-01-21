
import { Reason } from './Reason.model';

export interface Appointment {
  appointmentID: number;
  appointment_Status: string;
  appointment_Priority: string;
  providerUniqueKey: string;
  providerFirstName: string;
  providerLastName: string;

  memberFirstName: string;
  memberLasttName: string;
  patientUniqueKey: string;
  patientAge: number;
  patientImage: string;


  startTime: string;


  reasons: Reason[];
  LastModifiedDate: Date;
  LastModifiedBy: string;
}
