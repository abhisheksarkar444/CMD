import { MedicineCycleOption } from './MedicineCycleOption';

export class Medicine {
    constructor(public medicineId: number, public medicineName: string, public medicineDuration: number,
        public frequency?: string, public periodType?: string, public medicineCycle?: string,
        public medicineCycleOption?: MedicineCycleOption,
        public isAfterFood: Boolean = false, public quantity?: number, public medicineDescription?: string) { }
}