import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, switchMap, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Cryptocurrency } from '../models/cryptocurrency.model';

@Injectable({
  providedIn: 'root',
})
export class CryptocurrencyService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';
  private cryptoDataSubject = new BehaviorSubject<Cryptocurrency[]>([]);
  public cryptoData$ = this.cryptoDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.startRealTimeUpdates();
  }

  private startRealTimeUpdates(): void {
    // Update data every 30 seconds
    interval(30000)
      .pipe(switchMap(() => this.fetchCryptocurrencies()))
      .subscribe((data) => {
        this.cryptoDataSubject.next(data);
      });

    // Initial load
    this.fetchCryptocurrencies().subscribe((data) => {
      this.cryptoDataSubject.next(data);
    });
  }

  private fetchCryptocurrencies(): Observable<Cryptocurrency[]> {
    const url = `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h`;

    return this.http.get<Cryptocurrency[]>(url).pipe(
      map((data) => data || []),
      catchError((error) => {
        console.error('Error fetching cryptocurrency data:', error);
        return of([]);
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
