import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  template: `
    <div class="error-box rounded-lg p-4 mb-6">
      <p style="color: var(--danger-color)">{{ error() }}</p>
    </div>
  `,
  styles: [`
    .error-box {
      background-color: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
    
    .dark .error-box {
      background-color: rgba(248, 113, 113, 0.1);
      border: 1px solid rgba(248, 113, 113, 0.2);
    }
  `]
})
export class ErrorComponent {
  public error = input<string | null>(null);
}
