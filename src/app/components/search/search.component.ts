import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
  inject,
  signal,
  viewChild,
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
      .search-input {
        background-color: var(--bg-secondary);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
      }
      
      .search-input::placeholder {
        color: var(--text-tertiary);
      }
      
      .search-input:focus {
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    `,
  ],
})
export class SearchComponent implements OnInit, OnDestroy {
  // @ViewChild('searchInput', { static: false })
  // searchInput!: ElementRef<HTMLInputElement>;
  searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');

  private searchService = inject(SearchService);
  private cryptoDataManager = inject(CryptoDataManagerService);

  private subscription = new Subscription();

  public searchTerm = signal<string>('');

  ngOnInit(): void {
    this.subscription.add(
      this.searchService.searchTerm$.subscribe((searchTerm) => {
        this.searchTerm.set(searchTerm);
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
    this.cryptoDataManager.updateSearch(this.searchTerm());
  }

  private focusSearchInput(): void {
    this.searchInput()?.nativeElement.focus();
  }
}
