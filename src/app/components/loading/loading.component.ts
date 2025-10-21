import { Component } from '@angular/core';
import { TableHeaderComponent } from '../table-header/table-header.component';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [TableHeaderComponent],
  templateUrl: './loading.component.html',
  styles: [`
    .loading-container {
      background-color: var(--card-bg);
      border: 1px solid var(--border-color);
      backdrop-filter: blur(8px);
    }
    
    .skeleton-body {
      border-top: 1px solid var(--border-color);
    }
    
    .skeleton-row {
      border-bottom: 1px solid var(--border-color);
    }
    
    .skeleton-row:last-child {
      border-bottom: none;
    }
    
    .skeleton-box {
      background-color: var(--bg-tertiary);
    }
  `]
})
export class LoadingComponent {}
