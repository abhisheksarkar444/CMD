import { Reason_Category } from './Reason_Category';

export class Reason {
   constructor(
      public reasonCategory?: string,
      public reasonCategoryOption?: Reason_Category,
      public description?: string,
      public state: boolean = false,
      public reasonID?: number) {

   }
}