import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let platform = inject(PLATFORM_ID);
  if(isPlatformBrowser(platform)){
    req =req.clone({
      setHeaders:{token:localStorage.getItem('userToken')||''}
    })
  }
  return next(req);
};
