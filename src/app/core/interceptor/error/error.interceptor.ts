import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let toster=inject(ToastrService)
  return next(req).pipe(catchError((e)=>{
    toster.error(e.error.message);
    return throwError(()=>e)
  }))
};
