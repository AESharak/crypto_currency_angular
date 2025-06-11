import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-table-header',
  imports: [],
  template: `
    <div
      class="hidden md:grid md:grid-cols-5 gap-4 p-4 bg-slate-700/50 text-gray-300 text-sm font-medium"
    >
      @for (element of headerElements(); track element) {
      <div class="flex items-center" [class]="element.additionalClasses">
        <span>{{ element.text }}</span>
      </div>
      }
    </div>
  `,
})
export class TableHeaderComponent {
  public headerElements = signal<{ text: string; additionalClasses: string }[]>(
    [
      { text: '#', additionalClasses: '' },
      { text: 'Name', additionalClasses: '' },
      { text: 'Price', additionalClasses: 'justify-center' },
      { text: '24h Change', additionalClasses: 'justify-end' },
      { text: 'Chart', additionalClasses: 'justify-center' },
    ]
  );
}
