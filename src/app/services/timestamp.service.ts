import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimestampService {
  private lastUpdatedSubject = new BehaviorSubject<Date | null>(null);

  public lastUpdated$ = this.lastUpdatedSubject.asObservable();

  updateTimestamp(): void {
    this.lastUpdatedSubject.next(new Date());
  }

  getCurrentTimestamp(): Date | null {
    return this.lastUpdatedSubject.value;
  }
}
