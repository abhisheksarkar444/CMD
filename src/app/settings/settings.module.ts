import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { GenericQuestionsComponent } from "./generic-questions/generic-questions.component";
import { AngularMaterialModule } from "./angular-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { QuestionComponent } from "./generic-questions/category/question/question.component";
import { SettingsComponent } from "./settings.component";
import { CategoryComponent } from "./generic-questions/category/category.component";
import { MenuComponent } from "./menu/menu.component";
import { GenericService } from './generic-service/genericService';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GenericQuestionsComponent,
    QuestionComponent,
    SettingsComponent,
    CategoryComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [GenericService],
  exports: [
    GenericQuestionsComponent,
    QuestionComponent,
    SettingsComponent,
    CategoryComponent,
    MenuComponent,
    CommonModule,
    SettingsRoutingModule
  ]

})
export class SettingsModule { }
