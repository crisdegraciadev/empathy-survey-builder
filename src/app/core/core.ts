import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Routes, provideRouter } from '@angular/router';

export type CoreOptions = {
  routes: Routes;
};

export function provideCore({ routes }: CoreOptions) {
  return [provideAnimationsAsync(), provideRouter(routes)];
}
