import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { userSelector } from '../ngrx/ngrx.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private store = inject(Store);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAccess();
  }

  private checkAccess(): Observable<boolean> {
    return this.store.select(userSelector).pipe(
      filter(user => user._id !== undefined),
      take(1),
      map(user => {
        if (user?._id) {
          return true;
        }
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}