export class Question {
  questionId: number;
  questionText: string;
  questionDescription: string;
  category: Category;
  categoryID: number;
  providerUniqueKey: string = '1';
  Hints: AnswerHint[];
  AnswerType: string;
  CreatedDate: Date = new Date();
  CreatedBy: string;
  LastModifiedDate: Date = new Date();
  LastModifiedBy: string;
  IsActive: boolean = true;
}

export class AnswerHint {
  id?: number;
  description: string;
}

export class Category {
  id: number;
  providerSpeciality: string;
  description: string;
  providerUniqueID: string;
}