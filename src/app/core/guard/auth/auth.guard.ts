import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _Auth:AuthService =inject(AuthService);
  let router=inject(Router);
  if(_Auth.userDate() !== null){
    return true;
  }
  router.navigate(['/login']);
  return false 
};
