import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error',
  template: `
    <div class="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
      <p class="text-red-400">{{ error() }}</p>
    </div>
  `,
})
export class ErrorComponent {
  public error = input<string | null>(null);
}
