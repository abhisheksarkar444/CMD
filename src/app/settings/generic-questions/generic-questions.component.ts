import { Component, OnInit, Input, AfterViewInit, ViewChild } from "@angular/core";
import { Question, Category } from '../generic-entities/question';
import { GenericService } from '../generic-service/genericService';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/AuthService';

@Component({
  selector: "kkd-generic-questions",
  templateUrl: "./generic-questions.component.html",
  styleUrls: ["./generic-questions.component.css"]
})
export class GenericQuestionsComponent implements OnInit {
  subs: Subscription;
  categorySet = []; // Categories
  questionArray = [];
  doctorId: string;

  constructor(private genericService: GenericService, private authService: AuthService) { }

  categoryForm = new FormGroup({
    newCategoryName: new FormControl('')
  });


  getAllCategoriesById(ID: string)   //get all questions by  doc Id before filtering the questions by categoryId
  {
    this.genericService.getAllCategoriesById(ID).subscribe((info: []) => {
      info.forEach(q => {
        this.questionArray.push(q);
        if (!this.categorySet.find(qu => q["category"]["id"] == qu.id))
          this.categorySet.push(q["category"]);
      });

    });
  }
  addQuestion(question: Question) {
    question.providerUniqueKey = this.doctorId;
    this.questionArray.push(question);
    this.SaveUnsavedQuestionsToDB([question]);
  }

  SaveUnsavedQuestionsToDB(questionArray: Question[]) {
    console.log("question array", questionArray);
    this.genericService.SaveUnsavedQuestionsToDB(questionArray);
  }

  category = new Category();
  SaveCategory() {
    if (this.categoryForm.value.newCategoryName != '') {
      this.category.description = this.categoryForm.value.newCategoryName;
      this.category.providerSpeciality = this.categoryForm.value.newCategoryName;
      this.category.providerUniqueID = this.doctorId;
      this.genericService.SaveNewCategory(this.category).subscribe((cgry: Category) => {
        this.categorySet.push(cgry);
      });
      this.categoryForm.reset();
    }
  }

  ngOnInit() {

    this.doctorId = this.authService.getuserUniqueId();
    this.getAllCategoriesById(this.doctorId);
  }
}
