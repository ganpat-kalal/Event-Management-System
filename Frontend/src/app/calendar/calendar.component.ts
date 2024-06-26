// calendar.component.ts
import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendarEvents: any[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth'
  };

  constructor(private eventService: EventsService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((events) => {
      this.calendarEvents = events.map((event) => ({
        title: event.name,
        start: event.startDate,
        end: event.endDate,
      }));
    });
  }
}
