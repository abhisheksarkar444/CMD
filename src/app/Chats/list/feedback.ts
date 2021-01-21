export class FeedBack {
  overAllRating: string;
  remarks: string;
  areas: FeedBackArea[];
}

export class FeedBackArea {
  area: string;
  rating: number;
  remarks: string;
  constructor(area: string, rating: number, remarks: string) {
    this.rating = rating;
    this.area = area;
    this.remarks = remarks;

  }
}