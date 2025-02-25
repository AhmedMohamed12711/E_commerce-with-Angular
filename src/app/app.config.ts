import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { headerInterceptor } from './core/interceptor/header/header.interceptor';
import { loadingInterceptor } from './core/interceptor/loading/loading.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { errorInterceptor } from './core/interceptor/error/error.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), BrowserAnimationsModule,
    NgxSpinnerModule,provideClientHydration(withEventReplay()),provideHttpClient(withFetch(),withInterceptors([
    headerInterceptor,loadingInterceptor,errorInterceptor
  ])),
    importProvidersFrom(
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule,
  )]
};
