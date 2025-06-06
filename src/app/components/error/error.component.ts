import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  @Input() error: string | null = null;
}
