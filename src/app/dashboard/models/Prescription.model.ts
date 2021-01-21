import { Medicine } from './medicine.model';

export interface Prescription {
  prescriptionID: number;
  category: string;
  title: string;
  documentPath: string;
  isActive: boolean;
  createdDate: string;
  name: string;
  createdBy: string;
  medicines: Medicine[];
}