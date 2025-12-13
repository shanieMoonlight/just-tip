import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideThemeInitializer } from '@spider-baby/material-theming/init';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';
import { THEME_CONFIG } from './config/app-theme.config';
import { appViewTransition } from './config/app.view-transitions';
import { jtHttpInterceptors, JustTipIoConfigOptions, JustTipIoSetup,  } from './data/io';

//###########################//

const ioConfig: JustTipIoConfigOptions = {
  baseUrl: environment.serverBaseUrl
}

//###########################//
export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        ...jtHttpInterceptors
      ])
    ),
    provideAnimations(),
    provideRouter(appRoutes,
      withViewTransitions(appViewTransition)
    ),
    JustTipIoSetup.provideJustTipIo(ioConfig),
    provideThemeInitializer(THEME_CONFIG)
  ],
};
