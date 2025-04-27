import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, loggingInterceptor } from '../shared/utils/interceptors';
import { provideState, provideStore } from '@ngrx/store';
import { userReducer } from '../shared/ngrx/ngrx.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor])),
    provideStore(),
    provideState({ name: 'user', reducer: userReducer }),
  ]
};