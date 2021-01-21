import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "kkd-ngx-bar-chart",
  templateUrl: "./ngx-bar-chart.component.html",
  styleUrls: ["./ngx-bar-chart.component.css"]
})
export class NgxBarChartComponent implements OnInit {
  @Input() barChartData: any[];
  constructor() { }

  single: any[];

  view: any[] = [150, 65];
  showXAxis = false;
  showYAxis = false;
  gradient = false;
  showLegend = false;
  xAxisLabel = false;
  yAxisLabel = false;
  showXAxisLabel = false;
  showYAxisLabel = false;

  colorScheme = {
    domain: [
      "#AAAAAA",
      "#AAAAAA",
      "#AAAAAA",
      "#AAAAAA",
      "#18385c",
      "#AAAAAA",
      "#AAAAAA"
    ]
  };

  ngOnInit() {
    this.single = this.barChartData;

  }

  onSelect(event) {
    console.log(event, this.barChartData);
  }
}
