import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './Authentication/login/login.component';
import 'hammerjs';
import { PatientsModule } from "../app/patients/patients.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HomeComponent } from './home/home.component';
import { AvailabilityComponent } from './availability/availability.component';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { MaterialJsModule } from './materialjs.module';
import { Routes, RouterModule } from "@angular/router";
import { AppointmentsModule } from "./appointments/appointments.module";
import { SettingsModule } from "./settings/settings.module";
import { RegisterComponent } from './Authentication/register/register.component';
import { AvialbilityModule } from './availability/availability.module';
import { SidebarMenuItemComponent } from './home/sidebar/sidebar-menu-item/sidebar-menu-item.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { HeaderComponent } from './home/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './home/header/notification/notification.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AccountSettingsModule } from './account-settings/account-settings.module';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './Chats/list/list.component';
import { RatingComponent } from './Chats/rating/rating.component';
import { NewCategoryComponent } from './settings/new-category/new-category.component';
import { GenericSettingsComponent } from './settings/generic-settings/generic-settings.component';
import { AppointmentListViewComponent } from './appointments/appointment-list-view/appointment-list-view.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppointmentListViewComponent,
    AppComponent,
    HomeComponent,
    RegisterComponent,
    AvailabilityComponent,
    SidebarMenuItemComponent,
    SidebarComponent,
    HeaderComponent,
    NotificationComponent,
    AuthCallbackComponent,
    ListComponent,
    RatingComponent,
    GenericSettingsComponent,
    NewCategoryComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    MaterialJsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    DashboardModule,
    AppointmentsModule,
    NgbModule,
    PatientsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PatientsModule,
    AvialbilityModule,
    ChatRoomModule,
    SettingsModule,
    AccountSettingsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }