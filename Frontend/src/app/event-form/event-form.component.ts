import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup = new FormGroup({});
  categories: string[] = ['Conference', 'Meetup', 'Workshop', 'Seminar'];

  constructor(private fb: FormBuilder, private eventService: EventService) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      description: [''],
      attendees: [0, Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.eventService
        .createEvent(this.eventForm.value)
        .subscribe((result) => {
          console.log('Event created:', result);
        });
    }
  }
}
