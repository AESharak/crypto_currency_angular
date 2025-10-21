import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css']
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}

  get darkMode$() {
    return this.themeService.darkMode$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
