import { Routes } from '@angular/router';
import { AppRoutes } from '@core/common/constants/app-routes';
import { MainLayoutComponent } from '@layout/main-layout/main-layout.component';

export const APP_ROUTES: Routes = [
  {
    path: AppRoutes.ROOT,
    component: MainLayoutComponent,
    children: [
      {
        path: AppRoutes.ROOT,
        redirectTo: AppRoutes.DASHBOARD,
        pathMatch: 'full',
      },
      {
        path: AppRoutes.DASHBOARD,
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((r) => r.DASHBOARD_ROUTES),
      },
      {
        path: AppRoutes.SURVEYS,
        loadChildren: () =>
          import('./features/surveys/surveys.routes').then((r) => r.SURVEY_ROUTES),
      },
    ],
  },
];
