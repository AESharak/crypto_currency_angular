import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CryptocurrencyService } from './cryptocurrency.service';
import { SearchService } from './search.service';
import { TimestampService } from './timestamp.service';
import { Cryptocurrency } from '../models/cryptocurrency.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoDataManagerService {
  public filteredCryptos$: Observable<Cryptocurrency[]>;
  public loading$: Observable<boolean>;
  public error$: Observable<string | null>;
  public cryptoData$: Observable<Cryptocurrency[]>;
  public lastUpdated$: Observable<Date | null>;

  constructor(
    private cryptoService: CryptocurrencyService,
    private searchService: SearchService,
    private timestampService: TimestampService
  ) {
    this.loading$ = this.cryptoService.loading$;
    this.error$ = this.cryptoService.error$;
    this.cryptoData$ = this.cryptoService.cryptoData$;
    this.lastUpdated$ = this.timestampService.lastUpdated$;
    this.filteredCryptos$ = this.setupFilteredCryptos();
  }

  private setupFilteredCryptos(): Observable<Cryptocurrency[]> {
    return combineLatest([
      this.cryptoService.cryptoData$,
      this.searchService.searchTerm$,
    ]).pipe(
      map(([cryptos, searchTerm]) => {
        if (searchTerm.trim() === '') {
          return cryptos;
        }
        return this.filterCryptos(cryptos, searchTerm);
      }),
      tap(() => this.timestampService.updateTimestamp())
    );
  }

  private filterCryptos(
    cryptos: Cryptocurrency[],
    searchTerm: string
  ): Cryptocurrency[] {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        crypto.symbol.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  updateSearch(searchTerm: string): void {
    this.searchService.updateSearchTerm(searchTerm);
  }

  clearSearch(): void {
    this.searchService.clearSearch();
  }
}
