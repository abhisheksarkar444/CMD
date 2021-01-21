import { vital } from './vital.type';

export class Patient {
    public patientID: number;
    public patientUniqueKey: string;
    public subscriberID: string;
    public firstName: string;
    public lastName: string;
    public middleName: string;
    public email: string;
    public phoneNumber: string;
    public profilePhoto_PowerDriveKey: string;
    public profilePhoto_Path: string;

    public vitals: vital[];
    public userID: string;

}