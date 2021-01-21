import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "kkd-sidebar-menu-item",
  templateUrl: "./sidebar-menu-item.component.html",
  styleUrls: ["./sidebar-menu-item.component.css"]
})
export class SidebarMenuItemComponent implements OnInit {
  @Input() item;
  @Input() isExpanded;

  constructor() { }

  ngOnInit() { }
}
