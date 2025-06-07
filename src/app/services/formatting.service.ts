import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormattingService {
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

  formatDateTime(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  }

  getChangeClass(percentage: number): string {
    return percentage >= 0
      ? 'text-green-400 bg-green-500/10'
      : 'text-red-400 bg-red-500/10';
  }

  getTrendColor(percentage: number): string {
    return percentage >= 0 ? '#10b981' : '#ef4444';
  }

  formatLastUpdated(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  }
}
