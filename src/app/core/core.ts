import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Routes, provideRouter, withHashLocation } from '@angular/router';
import { apiInterceptor } from './common/interceptors/api.interceptor';

export type CoreOptions = {
  routes: Routes;
};

export function provideCore({ routes }: CoreOptions) {
  return [
    provideAnimationsAsync(),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    withInterceptors([apiInterceptor]),
  ];
}
