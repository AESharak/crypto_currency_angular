import { Component } from '@angular/core';
import { CryptoListComponent } from './components/crypto-list/crypto-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CryptoListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'crypto-dashboard';
}
