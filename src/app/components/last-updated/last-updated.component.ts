import { Component, inject, input } from '@angular/core';
import { FormattingService } from '../../services/formatting.service';

@Component({
  selector: 'app-last-updated',
  standalone: true,
  template: `
    <div class="text-center mt-6 text-gray-500 text-sm">
      Last updated: {{ formatting.formatLastUpdated(lastUpdated()!) }}
    </div>
  `,
})
export class LastUpdatedComponent {
  public lastUpdated = input.required<Date | null>();

  public formatting = inject(FormattingService);
}
