import { Component, Input } from '@angular/core';
import { FormattingService } from '../../services/formatting.service';

@Component({
  selector: 'app-last-updated',
  imports: [],
  templateUrl: './last-updated.component.html',
})
export class LastUpdatedComponent {
  @Input() lastUpdated: Date | null = null;
  constructor(public formatting: FormattingService) {}
}
