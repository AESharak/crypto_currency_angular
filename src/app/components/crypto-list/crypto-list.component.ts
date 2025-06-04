import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CryptocurrencyService } from '../../services/cryptocurrency.service';
import { Cryptocurrency } from '../../models/cryptocurrency.model';
import { SearchComponent } from '../search/search.component';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-crypto-list',
  standalone: true,
  imports: [CommonModule, SearchComponent, ChartComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">
          Cryptocurrency Dashboard
        </h1>
        <p class="text-gray-400">
          Real-time cryptocurrency prices and market data
        </p>
      </div>

      <!-- Search Component -->
      <app-search (searchChanged)="handleSearchChanged($event)"></app-search>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="flex justify-center items-center py-12">
        <div class="spinner"></div>
        <span class="ml-3 text-gray-400">Loading cryptocurrency data...</span>
      </div>

      <!-- Error State -->
      <div
        *ngIf="error"
        class="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6"
      >
        <p class="text-red-400">{{ error }}</p>
      </div>

      <!-- Crypto Table -->
      <div
        *ngIf="!isLoading && !error"
        class="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700"
      >
        <!-- Table Header -->
        <div
          class="hidden md:grid md:grid-cols-6 gap-4 p-4 bg-slate-700/50 text-gray-300 text-sm font-medium"
        >
          <div class="flex items-center">
            <span>#</span>
          </div>
          <div class="flex items-center">
            <span>Name</span>
          </div>
          <div class="flex items-center justify-end">
            <span>Price</span>
          </div>
          <div class="flex items-center justify-end">
            <span>24h Change</span>
          </div>
          <div class="flex items-center justify-center">
            <span>Chart</span>
          </div>
          <div class="flex items-center justify-center">
            <span>Actions</span>
          </div>
        </div>

        <!-- Table Body -->
        <div class="divide-y divide-slate-700">
          <div
            *ngFor="let crypto of filteredCryptos; trackBy: trackByCryptoId"
            class="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 hover:bg-slate-700/30 transition-colors duration-200"
          >
            <!-- Rank (Mobile: inline, Desktop: separate column) -->
            <div class="flex items-center md:justify-start">
              <span class="text-gray-400 text-sm font-mono w-8">{{
                crypto.market_cap_rank
              }}</span>
            </div>

            <!-- Name and Logo -->
            <div class="flex items-center space-x-3">
              <img
                [src]="crypto.image"
                [alt]="crypto.name + ' logo'"
                class="w-8 h-8 rounded-full"
                loading="lazy"
              />
              <div>
                <div class="text-white font-medium">{{ crypto.name }}</div>
                <div class="text-gray-400 text-sm uppercase">
                  {{ crypto.symbol }}
                </div>
              </div>
            </div>

            <!-- Price -->
            <div class="flex items-center justify-end">
              <span class="text-white font-mono text-lg">
                {{ formatPrice(crypto.current_price) }}
              </span>
            </div>

            <!-- 24h Change -->
            <div class="flex items-center justify-end">
              <span
                [class]="getChangeClass(crypto.price_change_percentage_24h)"
                class="font-mono text-sm px-2 py-1 rounded"
              >
                {{ formatPercentage(crypto.price_change_percentage_24h) }}
              </span>
            </div>

            <!-- Mini Chart -->
            <div class="flex items-center justify-center">
              <div class="w-20 h-12">
                <app-chart
                  *ngIf="
                    crypto.sparkline_in_7d &&
                    crypto.sparkline_in_7d.price &&
                    crypto.sparkline_in_7d.price.length > 0
                  "
                  [data]="crypto.sparkline_in_7d.price"
                  [color]="
                    crypto.price_change_percentage_24h >= 0
                      ? '#10b981'
                      : '#ef4444'
                  "
                ></app-chart>
                <div
                  *ngIf="
                    !crypto.sparkline_in_7d ||
                    !crypto.sparkline_in_7d.price ||
                    crypto.sparkline_in_7d.price.length === 0
                  "
                  class="text-gray-500 text-xs text-center"
                >
                  No data
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-center space-x-2">
              <button
                (click)="handleViewDetails(crypto)"
                class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                [attr.aria-label]="'View details for ' + crypto.name"
                tabindex="0"
              >
                View
              </button>
              <button
                (click)="handleToggleFavorite(crypto)"
                class="p-1 text-gray-400 hover:text-yellow-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
                [attr.aria-label]="'Toggle favorite for ' + crypto.name"
                tabindex="0"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="filteredCryptos.length === 0" class="text-center py-12">
          <div class="text-gray-400 mb-2">No cryptocurrencies found</div>
          <div class="text-gray-500 text-sm">
            Try adjusting your search criteria
          </div>
        </div>
      </div>

      <!-- Last Updated -->
      <div
        *ngIf="!isLoading && lastUpdated"
        class="text-center mt-6 text-gray-500 text-sm"
      >
        Last updated: {{ formatLastUpdated(lastUpdated) }}
      </div>
    </div>
  `,
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
          this.isLoading = false;
          this.lastUpdated = new Date();
          this.error = null;
        },
        error: (error) => {
          this.error =
            'Failed to load cryptocurrency data. Please try again later.';
          this.isLoading = false;
          console.error('Error loading crypto data:', error);
        },
      })
    );
  }

  handleSearchChanged(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

  handleViewDetails(crypto: Cryptocurrency): void {
    console.log('View details for:', crypto.name);
    // Implement detail view navigation
  }

  handleToggleFavorite(crypto: Cryptocurrency): void {
    console.log('Toggle favorite for:', crypto.name);
    // Implement favorite functionality
  }

  trackByCryptoId(index: number, crypto: Cryptocurrency): string {
    return crypto.id;
  }

  formatPrice(price: number): string {
    if (price >= 1) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4,
        maximumFractionDigits: 6,
      }).format(price);
    }
  }

  formatPercentage(percentage: number): string {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  }

  getChangeClass(percentage: number): string {
    if (percentage >= 0) {
      return 'text-green-400 bg-green-500/10';
    } else {
      return 'text-red-400 bg-red-500/10';
    }
  }

  formatLastUpdated(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  }
}
