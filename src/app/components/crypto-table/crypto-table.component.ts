import { Component, inject, input, Input } from '@angular/core';
import { Cryptocurrency } from '../../models/cryptocurrency.model';
import { ChartComponent } from '../chart/chart.component';
import { FormattingService } from '../../services/formatting.service';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { CryptoNameLogoComponent } from '../crypto-name-logo/crypto-name-logo.component';

@Component({
  selector: 'app-crypto-table',
  standalone: true,
  imports: [ChartComponent, TableHeaderComponent, CryptoNameLogoComponent],
  templateUrl: './crypto-table.component.html',
  styles: [`
    .crypto-table-body {
      border-top: 1px solid var(--border-color);
    }
    
    .crypto-row {
      border-bottom: 1px solid var(--border-color);
    }
    
    .crypto-row:hover {
      background-color: var(--table-row-hover);
    }
    
    .crypto-row:last-child {
      border-bottom: none;
    }
  `]
})
export class CryptoTableComponent {
  public filteredCryptos = input<Cryptocurrency[]>([]);
  public isLoading = input<boolean>(false);
  public error = input<string | null>(null);

  public formatting = inject(FormattingService);
}
