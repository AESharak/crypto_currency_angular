import { Component } from '@angular/core';
import { TableHeaderComponent } from '../table-header/table-header.component';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [TableHeaderComponent],
  templateUrl: './loading.component.html',
})
export class LoadingComponent {}
