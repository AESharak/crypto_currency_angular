import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="mb-8">
      <h1 class="text-2xl md:text-4xl font-bold text-white mb-2">
        Cryptocurrency Dashboard
      </h1>
      <p class="text-gray-400">
        Real-time cryptocurrency prices and market data
      </p>
    </div>
  `,
})
export class HeaderComponent {}
