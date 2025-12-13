import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { JtNavbar } from './ui/nav/nav';
import { JtDarkModeToggle } from './ui/theming/dark-mode/dark-mode-toggle';
import { JtThemePicker } from './ui/theming/picker/theme-picker';

@Component({
  imports: [
    RouterModule,
    RouterOutlet,
    JtDarkModeToggle,
    JtNavbar,
    JtThemePicker
  ],
  selector: 'jt-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'just-tip';
}
