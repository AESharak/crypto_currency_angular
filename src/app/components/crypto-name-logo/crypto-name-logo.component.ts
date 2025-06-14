import { Component, input } from '@angular/core';
import { Cryptocurrency } from '../../models/cryptocurrency.model';

@Component({
  selector: 'app-crypto-name-logo',
  standalone: true,
  template: ` <div
    class="row-start-1 col-start-1 flex items-center space-x-3 md:col-start-2"
  >
    <img
      [src]="crypto().image"
      [alt]="crypto().name + ' logo'"
      class="w-8 h-8 rounded-full"
      loading="lazy"
    />
    <div>
      <div class="text-white font-medium">{{ crypto().name }}</div>
      <div class="text-gray-400 text-sm uppercase">
        {{ crypto().symbol }}
      </div>
    </div>
  </div>`,
})
export class CryptoNameLogoComponent {
  public crypto = input.required<Cryptocurrency>();
}
