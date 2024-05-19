import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Routes, provideRouter } from '@angular/router';
import { apiInterceptor } from './common/interceptors/api.interceptor';

export type CoreOptions = {
  routes: Routes;
};

export function provideCore({ routes }: CoreOptions) {
  return [
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(),
    withInterceptors([apiInterceptor]),
  ];
}
