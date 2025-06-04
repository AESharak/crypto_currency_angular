import { Component } from '@angular/core';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CryptoListComponent],
  template: ` <app-crypto-list></app-crypto-list> `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'crypto-dashboard';
}
