import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { getToken } from '../utils/local-storage';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = getToken();
    if (token) {
      this.router.navigate(['/blogs']);
      return false;
    }
    return true;
  }
}