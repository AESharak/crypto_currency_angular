import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { CryptoDataManagerService } from './services/crypto-data-manager.service';
import { Cryptocurrency } from './models/cryptocurrency.model';
import { SearchComponent } from './components/search/search.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import { CryptoTableComponent } from './components/crypto-table/crypto-table.component';
import { LastUpdatedComponent } from './components/last-updated/last-updated.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SearchComponent,
    HeaderComponent,
    LoadingComponent,
    ErrorComponent,
    CryptoTableComponent,
    LastUpdatedComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  // filteredCryptos: Cryptocurrency[] = [];
  // isLoading = true;
  // error: string | null = null;
  // lastUpdated: Date | null = null;

  public filteredCryptos = signal<Cryptocurrency[]>([]);
  public isLoading = signal<boolean>(true);
  public error = signal<string | null>(null);
  public lastUpdated = signal<Date | null>(null);

  private cryptoDataManager = inject(CryptoDataManagerService);

  private subscription = new Subscription();

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setupSubscriptions(): void {
    // Subscribe to filtered cryptocurrencies
    this.subscription.add(
      this.cryptoDataManager.filteredCryptos$.subscribe((filteredCryptos) => {
        this.filteredCryptos.set(filteredCryptos);
      })
    );

    // Subscribe to loading state
    this.subscription.add(
      this.cryptoDataManager.loading$.subscribe((isLoading) => {
        this.isLoading.set(isLoading);
      })
    );

    // Subscribe to error state
    this.subscription.add(
      this.cryptoDataManager.error$.subscribe((error) => {
        this.error.set(error);
      })
    );

    // Subscribe to last updated timestamp
    this.subscription.add(
      this.cryptoDataManager.lastUpdated$.subscribe((lastUpdated) => {
        this.lastUpdated.set(lastUpdated);
      })
    );
  }
}
