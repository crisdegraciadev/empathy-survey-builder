import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const BASE_URL = 'https://techtestapi1.azurewebsites.net';

  return next(
    req.clone({
      url: `${BASE_URL}${req.url}`,
      headers: new HttpHeaders({
        'X-API-KEY': environment.X_API_KEY,
      }),
    }),
  );
};
