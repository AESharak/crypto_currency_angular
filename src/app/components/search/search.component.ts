import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SearchService } from '../../services/search.service';
import { CryptoDataManagerService } from '../../services/crypto-data-manager.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styles: [
    `
      input:focus {
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    `,
  ],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: false })
  searchInput!: ElementRef<HTMLInputElement>;

  private searchService = inject(SearchService);
  private cryptoDataManager = inject(CryptoDataManagerService);

  private subscription = new Subscription();

  public searchTerm = '';

  ngOnInit(): void {
    this.subscription.add(
      this.searchService.searchTerm$.subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardShortcut(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      this.focusSearchInput();
    }
  }

  handleSearch(): void {
    this.cryptoDataManager.updateSearch(this.searchTerm);
  }

  private focusSearchInput(): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }
}
