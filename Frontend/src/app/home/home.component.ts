import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  events: any[] = [];
  filter: string = '';
  sortOrder: string = 'date';
  isLoggedIn: boolean = false;
  private authSubscription: Subscription | undefined;

  constructor(
    private eventsService: EventsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
    this.authSubscription = this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  /**
   * The `loadEvents` function retrieves events data from a service and assigns it to a component
   * property.
   */
  loadEvents() {
    this.eventsService.getEvents().subscribe((events) => {
      this.events = events;
    });
  }

  /**
   * The `deleteEvent` function deletes an event by its ID and updates the events list accordingly.
   * @param {number} eventId - The `eventId` parameter is a number that represents the unique
   * identifier of the event that needs to be deleted. This identifier is used to locate and remove the
   * specific event from the list of events.
   */
  deleteEvent(eventId: number): void {
    this.eventsService.deleteEvent(eventId).subscribe({
      next: () => {
        this.events = this.events.filter((event) => event.id !== eventId);
        console.log('Event deleted successfully!');
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  /**
   * The ngOnDestroy function unsubscribes from the authSubscription if it exists.
   */
  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
}
