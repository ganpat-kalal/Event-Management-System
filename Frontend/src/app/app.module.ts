import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MaterialModule } from './shared/material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

// Components
import { HomeComponent } from './home/home.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

// Pipes
import { EventFilterPipe } from './shared/pipes/event-filter.pipe';
import { EventSortPipe } from './shared/pipes/event-sort.pipe';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventFormComponent,
    EventDetailComponent,
    LoginComponent,
    RegisterComponent,
    CalendarComponent,
    EventFilterPipe,
    EventSortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSnackBarModule,
    MatIconModule,
    FullCalendarModule,
  ],
  providers: [provideAnimationsAsync(), AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
