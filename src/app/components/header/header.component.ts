import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <div class="mb-8">
      <h1 class="text-2xl md:text-4xl font-bold mb-2 text-primary">
        Cryptocurrency Dashboard
      </h1>
      <p class="text-secondary">
        Real-time cryptocurrency prices and market data
      </p>
    </div>
  `,
})
export class HeaderComponent {}
