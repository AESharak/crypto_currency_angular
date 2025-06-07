import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CryptocurrencyService } from '../../services/cryptocurrency.service';
import { Cryptocurrency } from '../../models/cryptocurrency.model';
import { SearchComponent } from '../search/search.component';
import { HeaderComponent } from '../header/header.component';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';
import { CryptoTableComponent } from '../crypto-table/crypto-table.component';
import { LastUpdatedComponent } from '../last-updated/last-updated.component';

@Component({
  selector: 'app-crypto-list',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    HeaderComponent,
    LoadingComponent,
    ErrorComponent,
    CryptoTableComponent,
    LastUpdatedComponent,
  ],
  templateUrl: './crypto-list.component.html',
})
export class CryptoListComponent implements OnInit, OnDestroy {
  cryptos: Cryptocurrency[] = [];
  filteredCryptos: Cryptocurrency[] = [];
  isLoading = true;
  error: string | null = null;
  lastUpdated: Date | null = null;

  private searchTermSubject = new BehaviorSubject<string>('');
  private subscription = new Subscription();

  constructor(private cryptoService: CryptocurrencyService) {}

  ngOnInit(): void {
    this.setupDataSubscription();
    this.setupLoadingSubscription();
    this.setupErrorSubscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setupLoadingSubscription(): void {
    this.subscription.add(
      this.cryptoService.loading$.subscribe((isLoading) => {
        this.isLoading = isLoading;
      })
    );
  }

  private setupErrorSubscription(): void {
    this.subscription.add(
      this.cryptoService.error$.subscribe((error) => {
        this.error = error;
      })
    );
  }

  private setupDataSubscription(): void {
    const combinedStream = combineLatest([
      this.cryptoService.cryptoData$,
      this.searchTermSubject.asObservable(),
    ]).pipe(
      map(([cryptos, searchTerm]) => {
        if (searchTerm.trim() === '') {
          return cryptos;
        }
        return cryptos.filter(
          (crypto) =>
            crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );

    this.subscription.add(
      combinedStream.subscribe({
        next: (filteredCryptos) => {
          this.filteredCryptos = filteredCryptos;
          this.lastUpdated = new Date();
        },
        error: (error) => {
          console.error('Error in data subscription:', error);
        },
      })
    );
  }

  handleSearchChanged(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }
}
