export class Prescription {
   constructor(public PrescriptionID: number, public Category: string, public Title: string, public MedicineDuration: number,
      public Frequency: string, public PeriodType: string, public Morning: string, public Afternoon: string, public Night: string,
      public IsAfterFood: boolean, public DocumentPath: string, public Quantity: number) {

   }

}