import { Medicine } from './Medicine';

export class Prescription {
        constructor(public prescriptionID: number, public title?: string, public category?: string,
                public documentPath?: string, public medicines?: Medicine[], public createdBy?: string, public createdDate?: Date) { }

}