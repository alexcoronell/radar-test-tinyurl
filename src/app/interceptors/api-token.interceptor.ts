import type { HttpInterceptorFn } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

export const apiTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const apiToken = environment.apiToken;

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${apiToken}`
  });
  const request = req.clone({ headers });
  return next(request);
};
