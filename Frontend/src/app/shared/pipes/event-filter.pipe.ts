import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventFilter',
})
export class EventFilterPipe implements PipeTransform {
  transform(events: any[], filter: string): any[] {
    if (!events || !filter) {
      return events;
    }
    return events.filter((event) =>
      event.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
}
