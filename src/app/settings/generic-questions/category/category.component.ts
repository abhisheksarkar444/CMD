import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { GenericService } from '../../generic-service/genericService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Question } from '../../generic-entities/question';

@Component({
  selector: "kkd-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  @Input() category;
  @Output() question = new EventEmitter();

  unsavedQuestion: Question;

  isExpanded: boolean;
  public show_dialog: boolean = false;

  expand() {
    this.isExpanded = !this.isExpanded;
  }

  toggle() {
    this.show_dialog = !this.show_dialog;
  }

  constructor(private genericservice: GenericService) {

  }

  questionForm = new FormGroup({
    questionText: new FormControl('', Validators.required),
    questionDescription: new FormControl(''),
    option1: new FormControl(''),
    option2: new FormControl(''),
    option3: new FormControl('')
  });


  AddToQuestionArray() {
    if (this.questionForm.value.questionText != '') {

      this.unsavedQuestion = new Question();
      this.unsavedQuestion.questionDescription = this.questionForm.value.questionDescription;
      this.unsavedQuestion.questionText = this.questionForm.value.questionText;
      this.unsavedQuestion.categoryID = this.category.id;
      this.unsavedQuestion.AnswerType = "Yes_or_No";
      this.unsavedQuestion.Hints = [
        { description: this.questionForm.value.option1 },
        { description: this.questionForm.value.option2 },
        { description: this.questionForm.value.option3 }
      ];
      this.question.emit(this.unsavedQuestion);
      this.isExpanded = !this.isExpanded;
      this.questionForm.reset();
    }
  }

  ngOnInit() {
    console.log("category data", this.category);
  }
}
