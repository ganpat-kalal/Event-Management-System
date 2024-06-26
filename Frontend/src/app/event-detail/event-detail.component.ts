import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../services/events.service';
import { categoriesService } from '../services/categories.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {
  event: any;
  categoryName: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: categoriesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventsService.getEvent(Number(id)).subscribe((event) => {
      this.event = event;
      this.fetchCategoryName(event.categoryId);
    });
  }

  /**
   * The function fetches the name of a category using its ID from a service and assigns it to a
   * variable.
   * @param {number} categoryId - The `categoryId` parameter is a number that represents the unique
   * identifier of a category. It is used to fetch the name of the category from the categories
   * service.
   */
  private fetchCategoryName(categoryId: number): void {
    this.categoriesService.getCategory(categoryId).subscribe(
      (category) => {
        this.categoryName = category.name;
      },
      (error) => {
        console.error('Failed to load category', error);
      }
    );
  }
}
