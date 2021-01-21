import { AppointmentAnswer } from './AppointmentAnswer';
import { Prescription } from './Prescription';
import { Reason } from './Reason';
import { Appointment_FeedBack } from './Appointment_FeedBack';
import { AppointmentStatusOption } from './AppointmentStatusOption';

export class Appointment {
    constructor(public appointmentID?: number, public appointmentCode?: number, public startTime?: Date,
        public endTime?: Date, public appointment_Status?: string, public appointmentStatusOption?: AppointmentStatusOption, public providerUniqueKey?: string,
        public providerFirstName?: string, public providerMiddleName?: string, public providerLastName?: string,
        public memberFirstName?: string, public memberLasttName?: string, public memberMiddleName?: string,
        public patientUniqueKey?: string, public answers: AppointmentAnswer[] = [],
        public reasons: Reason[] = [], public prescriptions: Prescription[] = [], public feedBacks: Appointment_FeedBack[] = [],
        public appointment_Priority?: string,
        public lastModifiedDate?: Date,
        public lastModifiedBy?: string
    ) {

    }
}