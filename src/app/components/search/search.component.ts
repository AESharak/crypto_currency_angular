import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styles: [
    `
      input:focus {
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    `,
  ],
})
export class SearchComponent {
  @Output() searchChanged = new EventEmitter<string>();
  @ViewChild('searchInput', { static: false })
  searchInput!: ElementRef<HTMLInputElement>;

  searchTerm = '';

  @HostListener('document:keydown', ['$event'])
  handleKeyboardShortcut(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      this.focusSearchInput();
    }
  }

  handleSearch(): void {
    this.searchChanged.emit(this.searchTerm);
  }

  private focusSearchInput(): void {
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }
}
