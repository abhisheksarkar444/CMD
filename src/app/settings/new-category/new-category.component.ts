import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'kkd-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  categoryNames: string[] = [];
  openform = false;



  categoryForm = new FormGroup(
    {

      categoryname: new FormControl('')
    })


  constructor() { }

  addCategory() {


    this.categoryNames.push(this.categoryForm.value.categoryname);
    console.log(this.categoryNames);

  }

  OnClickopenForm() {
    this.openform = true;

    return this.openform;

  }


  ngOnInit() {
  }

}
