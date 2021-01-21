import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotComponent } from './slot/slot.component';
import { MatSelectModule, MatCheckboxModule } from '@angular/material';
import { DayselectionComponent } from './dayselection/dayselection.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [SlotComponent, DayselectionComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatExpansionModule,
  ],
  exports: [
    SlotComponent,
    DayselectionComponent]
})
export class AvialbilityModule { }
