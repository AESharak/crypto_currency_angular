import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>('');

  public searchTerm$ = this.searchTermSubject.asObservable();

  updateSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

  clearSearch(): void {
    this.searchTermSubject.next('');
  }

  getCurrentSearchTerm(): string {
    return this.searchTermSubject.value;
  }
}
