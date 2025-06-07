import { Component, Input } from '@angular/core';
import { EmptyDataComponent } from '../empty-data/empty-data.component';
import { Cryptocurrency } from '../../models/cryptocurrency.model';
import { ChartComponent } from '../chart/chart.component';
import { FormattingService } from '../../services/formatting.service';

@Component({
  selector: 'app-crypto-table',
  imports: [EmptyDataComponent, ChartComponent],
  templateUrl: './crypto-table.component.html',
})
export class CryptoTableComponent {
  @Input() filteredCryptos: Cryptocurrency[] = [];
  @Input() isLoading: boolean = false;
  @Input() error: string | null = null;

  constructor(public formatting: FormattingService) {}
}
