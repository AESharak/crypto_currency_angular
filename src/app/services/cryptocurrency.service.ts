import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, switchMap, BehaviorSubject } from 'rxjs';
import { map, catchError, tap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { Cryptocurrency } from '../models/cryptocurrency.model';

@Injectable({
  providedIn: 'root',
})
export class CryptocurrencyService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';
  private cryptoDataSubject = new BehaviorSubject<Cryptocurrency[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public cryptoData$ = this.cryptoDataSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.startRealTimeUpdates();
  }

  private startRealTimeUpdates(): void {
    // Initial load
    this.fetchCryptocurrencies().subscribe();

    // Update data every 30 seconds
    interval(30000)
      .pipe(switchMap(() => this.fetchCryptocurrencies()))
      .subscribe();
  }

  private fetchCryptocurrencies(): Observable<Cryptocurrency[]> {
    const url = `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h`;

    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<Cryptocurrency[]>(url).pipe(
      map((data) => data || []),
      tap((data) => {
        this.cryptoDataSubject.next(data);
      }),
      catchError((error) => {
        console.error('Error fetching cryptocurrency data:', error);
        this.errorSubject.next(
          'Failed to load cryptocurrency data. Please try again later.'
        );
        return of([]);
      }),
      finalize(() => {
        this.loadingSubject.next(false);
      })
    );
  }

  searchCryptocurrencies(searchTerm: string): Observable<Cryptocurrency[]> {
    return this.cryptoData$.pipe(
      map((cryptos) =>
        cryptos.filter(
          (crypto) =>
            crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  getCryptocurrencyChart(id: string, days: number = 7): Observable<any> {
    const url = `${this.baseUrl}/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`;

    return this.http.get(url).pipe(
      catchError((error) => {
        console.error(`Error fetching chart data for ${id}:`, error);
        return of({ prices: [] });
      })
    );
  }
}
