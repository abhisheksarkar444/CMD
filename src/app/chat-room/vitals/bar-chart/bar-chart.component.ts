import { Component, OnInit, Input, ApplicationRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kkd-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private appref: ApplicationRef, private cdref: ChangeDetectorRef) { }
  @Input() p_data;
  ngOnInit() {
    setInterval(() => {
      this.appref.tick();
    }, 5000);
  }

  view: any[] = [95, 55];
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
      "#AAAAAA",
      "#AAAAAA",
      "#18385c",
    ]
  };
}
