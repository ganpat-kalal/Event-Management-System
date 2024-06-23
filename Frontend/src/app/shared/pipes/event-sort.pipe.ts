import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventSort',
})
export class EventSortPipe implements PipeTransform {
  transform(events: any[], sortOrder: string): any[] {
    if (!events || !sortOrder) {
      return events;
    }
    return events.sort((a, b) => {
      if (sortOrder === 'date') {
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      } else if (sortOrder === 'name') {
        return a.name.localeCompare(b.name);
      }
    });
  }
}
