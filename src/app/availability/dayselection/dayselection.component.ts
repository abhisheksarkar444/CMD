import { Component, OnInit, Output, EventEmitter } from '@angular/core';
declare const showCheckboxes: any;
@Component({
  selector: 'app-dayselection',
  templateUrl: './dayselection.component.html',
  styleUrls: ['./dayselection.component.css']
})
export class DayselectionComponent implements OnInit {
  private expanded = false;

  constructor() {

  }

  ngOnInit() {

  }

  @Output() changed = new EventEmitter<string[]>();
  days: string[] = [];
  updateNoOfDays(day: string) {
    if (this.days.find(d => d == day) == undefined) {
      this.days.push(day);
    } else {
      this.days.splice(this.days.indexOf(day), 1);
    }
    this.changed.emit(this.days);
  }

  showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!this.expanded) {
      checkboxes.style.display = "block";
      this.expanded = true;
    } else {
      checkboxes.style.display = "none";
      this.expanded = false;
    }
  }

}
