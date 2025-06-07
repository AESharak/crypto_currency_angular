import { Component, Input } from '@angular/core';
import { EmptyDataComponent } from '../empty-data/empty-data.component';
import { Cryptocurrency } from '../../models/cryptocurrency.model';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-crypto-table',
  imports: [EmptyDataComponent, ChartComponent],
  templateUrl: './crypto-table.component.html',
})
export class CryptoTableComponent {
  @Input() filteredCryptos: Cryptocurrency[] = [];
  @Input() isLoading: boolean = false;
  @Input() error: string | null = null;

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
}
