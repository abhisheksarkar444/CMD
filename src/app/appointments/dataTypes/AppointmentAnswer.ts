import { Question } from './Question';

export class AppointmentAnswer {
   constructor(public id?: number, public answer?: boolean, public description?: string, public questionID?: number, public question?: Question) {

   }
}