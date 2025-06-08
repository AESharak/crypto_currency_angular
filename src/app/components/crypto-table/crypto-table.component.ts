import { Component, Input } from '@angular/core';
import { Cryptocurrency } from '../../models/cryptocurrency.model';
import { ChartComponent } from '../chart/chart.component';
import { FormattingService } from '../../services/formatting.service';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { CryptoNameLogoComponent } from '../crypto-name-logo/crypto-name-logo.component';

@Component({
  selector: 'app-crypto-table',
  imports: [ChartComponent, TableHeaderComponent, CryptoNameLogoComponent],
  templateUrl: './crypto-table.component.html',
})
export class CryptoTableComponent {
  @Input() filteredCryptos: Cryptocurrency[] = [];
  @Input() isLoading: boolean = false;
  @Input() error: string | null = null;

  constructor(public formatting: FormattingService) {}
}
