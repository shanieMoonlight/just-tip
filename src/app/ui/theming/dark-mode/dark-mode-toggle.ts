import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';

import { SbThemeService } from '@spider-baby/material-theming/service';
import { JustTipTheme } from '../../theme';

/**
 * A Material Design toggle component for switching between light and dark modes.
 * 
 * This component provides a visually appealing button that toggles between light and dark mode,
 * automatically updating its appearance based on the current mode. It integrates with
 * ThemeService to persist user preferences.
 * 
 * @example
 * ```html
 * <jt-dark-mode-toggle-mat [showTooltip]="true"/>
 * ```
 */
@Component({
  selector: 'jt-dark-mode-toggle',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './dark-mode-toggle.html',
  styleUrls: ['./dark-mode-toggle.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.color]': '"var(--mat-sys-" + color() + ")"',
  },
})
export class JtDarkModeToggle {

  private _themeService = inject(SbThemeService)

  //- - - - - - - - - - - - - - -//

  /**
   * Emits an event when the dark mode is toggled.
   * The event payload is a boolean indicating whether dark mode is enabled or not.
   */

  // Output: toggleIsDark
  toggleIsDark = output<boolean>();

  // Inputs: hideSwitch, color
  hideSwitch = input(true);
  color = input<JustTipTheme | undefined>();

  //- - - - - - - - - - - - - - -//

  protected isDark = this._themeService.isDarkMode

  //- - - - - - - - - - - - - - -//

  toggleDarkTheme = (isDark: boolean) => {
    this._themeService.setDarkMode(isDark ? 'dark' : 'light');
    this.toggleIsDark.emit(isDark);
  }

} //Cls

