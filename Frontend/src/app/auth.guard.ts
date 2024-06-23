import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.authService.currentUserValue;
    if (user) {
      // Check if route is restricted by role
      if (next.data['roles'] && next.data['roles'].indexOf(user.role) === -1) {
        // Role not authorized so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      // Authorized so return true
      return true;
    }
    // Not logged in so redirect to login page with the return URL
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
