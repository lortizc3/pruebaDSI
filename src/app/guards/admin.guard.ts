import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Check if the user is logged in and has admin role
  if (authService.isLoggedIn && authService.currentUserValue?.role === 'admin') {
    return true;
  }
  
  // If user is logged in but not admin, redirect to characters
  if (authService.isLoggedIn) {
    router.navigate(['/characters']);
    return false;
  }
  
  // If not logged in, redirect to login
  router.navigate(['/login']);
  return false;
}; 