// reports.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  eventsPerMonthData: ChartDataSets[] = [{ data: [], label: 'Events' }];
  attendeesPerMonthData: ChartDataSets[] = [{ data: [], label: 'Attendees' }];
  eventsByCategoryData: ChartDataSets[] = [
    { data: [], label: 'Events by Category' },
  ];
  attendeesByEventData: ChartDataSets[] = [
    { data: [], label: 'Attendees by Event' },
  ];
  eventsByLocationData: ChartDataSets[] = [
    { data: [], label: 'Events by Location' },
  ];

  monthLabels: Label[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  categoryLabels: Label[] = [];
  eventLabels: Label[] = [];
  locationLabels: Label[] = [];

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [{}],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEventStatistics().subscribe((statistics) => {
      this.eventsPerMonthData[0].data = statistics.eventsPerMonth;
      this.attendeesPerMonthData[0].data = statistics.attendeesPerMonth;

      this.categoryLabels = statistics.eventsByCategory.map((e) => e.category);
      this.eventsByCategoryData[0].data = statistics.eventsByCategory.map(
        (e) => e.count
      );

      this.eventLabels = statistics.attendeesByEvent.map((e) => e.eventName);
      this.attendeesByEventData[0].data = statistics.attendeesByEvent.map(
        (e) => e.attendeeCount
      );

      this.locationLabels = statistics.eventsByLocation.map((e) => e.location);
      this.eventsByLocationData[0].data = statistics.eventsByLocation.map(
        (e) => e.count
      );
    });
  }
}
