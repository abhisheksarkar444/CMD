import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'kkd-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() rating: number;
  @Input() itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  inputName: string;

  ngOnInit(): void {
    this.inputName = this.itemId + '_rating';
  }

  constructor() { }

  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
  }
}

