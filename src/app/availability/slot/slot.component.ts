import { Component, OnInit, Input, ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {
  expand_status = false;
  @Input() availabilities;
  @Input() displayedColumns: string[];

  @Input() timeslots;
  @Input() totSlots;
  @Input() timewasted;

  dislayedColumns: string[] = ['dayOfWeek', 'startTime', 'endTime', 'slotInterval_Minutes'];

  constructor(private appref: ApplicationRef) { }

  ngOnInit(): void {

  }
}
