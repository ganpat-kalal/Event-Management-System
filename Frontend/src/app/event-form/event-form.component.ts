import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { AuthService } from '../services/auth.service';
import { categoriesService } from '../services/categories.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup = new FormGroup({});
  categories: any[] = [];
  loading = false;
  error = '';
  isEditMode = false; // To track if we are in edit mode
  eventId: number = 0; // To store the event ID when editing

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService,
    private authService: AuthService,
    private router: Router,
    private categoriesService: categoriesService,
    private route: ActivatedRoute // Activated route to get route parameters
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventId = Number(params.get('id'));
      if (this.eventId) {
        this.isEditMode = true;
        this.loadEvent(this.eventId);
      }
    });

    this.initializeForm();
    this.getCategories();
  }

  initializeForm() {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
      attendees: [0, Validators.required],
      categoryId: ['', Validators.required],
      userId: this.authService.currentUserValue.id,
    });
  }

  /**
   * The `loadEvent` function retrieves an event with a specific ID from a service and updates the
   * event form with the retrieved data.
   * @param {number} id - The `id` parameter in the `loadEvent` function is a number that represents
   * the unique identifier of the event that needs to be loaded. This identifier is used to fetch the
   * event data from the `eventsService` by calling the `getEvent` method with the provided `id`.
   */
  loadEvent(id: number) {
    this.eventsService.getEvent(id).subscribe((event) => {
      this.eventForm.patchValue(event);
    });
  }

  /**
   * The function returns the controls of the eventForm in TypeScript.
   * @returns The `f()` function is returning the controls of the `eventForm` form group.
   */
  get f() {
    return this.eventForm.controls;
  }

 /**
  * The function `getCategories` retrieves categories from a service and assigns them to a component
  * property.
  */
  getCategories() {
    this.categoriesService.getCategories().subscribe((result: any[]) => {
      this.categories = result;
    });
  }

  /**
   * The onSubmit function checks if a form is valid, then either updates or creates an event using a
   * service, handling success and error cases accordingly.
   */
  onSubmit() {
    if (this.eventForm.valid) {
      this.loading = true;
      let operation;
      if (this.isEditMode) {
        this.eventForm.value.id = this.eventId;
        operation = this.eventsService.updateEvent(
          this.eventId,
          this.eventForm.value
        );
      } else {
        debugger;
        operation = this.eventsService.createEvent(this.eventForm.value);
      }

      operation.subscribe(
        (result) => {
          this.loading = false;
          this.router.navigate(['/']);
          console.log(
            this.isEditMode ? 'Event updated:' : 'Event created:',
            result
          );
        },
        (error) => {
          this.error = error?.error?.message || 'An error occurred';
          this.loading = false;
        }
      );
    }
  }
}
