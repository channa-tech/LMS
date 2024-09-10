import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withXsrfConfiguration } from '@angular/common/http';
import { initializeAppFactory } from './login/InitialiserService';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),provideZoneChangeDetection({ eventCoalescing: true }), 
    {provide:APP_INITIALIZER,useFactory:initializeAppFactory,deps:[HttpClient],multi:true},
    provideRouter(routes),provideHttpClient(
    withXsrfConfiguration({headerName:'XSRF-TOKEN',cookieName:'X-SRF-TOKEN'})
  ), provideAnimationsAsync()]
};
