import { Component, OnInit } from '@angular/core';
import { FeedBack, FeedBackArea } from './feedback';
import { ListService } from './list.service';
interface Feedbacks {
  id: number;
  rating: number;
  Questions: string;
}
@Component({
  selector: 'kkd-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  feedback: FeedBack = new FeedBack();
  ratingClicked: number;
  itemIdRatingClicked: string;
  description: string;
  constructor(private service: ListService) { }
  items: Feedbacks[] = [
    { 'id': 1, 'rating': 1, 'Questions': '1.What was your experinece speaking to Doctor' },
    { 'id': 2, 'rating': 2, 'Questions': '2.Is your issue solved by the doctor with the appointment' },
    { 'id': 3, 'rating': 3, 'Questions': '3.Did the suggestion Prescrition works well for u' }
  ];

  ratingComponentClick(clickObj: any): void {
    const item = this.items.find(((i: any) => i.id === clickObj.itemId));
    if (!!item) {
      item.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = item.Questions;
    }

  }
  public emoji: string = "";

  onEmojis(value: string) {
    this.emoji = value;
  }

  OnSubmit() {
    this.feedback.overAllRating = this.emoji;
    this.feedback.remarks = this.description;
    this.feedback.areas = [];
    this.feedback.areas.push(new FeedBackArea(this.items[0].Questions, this.items[0].rating, "Gud boy"));
    this.feedback.areas.push(new FeedBackArea(this.items[1].Questions, this.items[1].rating, "ohh noo"));
    this.feedback.areas.push(new FeedBackArea(this.items[2].Questions, this.items[2].rating, "Oee hoeee"));


    this.service.logFeedBack(this.feedback);

  }
}