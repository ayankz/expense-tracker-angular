import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../pages/auth/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated() 
    ? true 
    : router.createUrlTree(['/login']);
};
