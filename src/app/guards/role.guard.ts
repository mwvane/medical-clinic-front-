import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../user/userRole';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    if (
      this.authService.loggedUser &&
      this.authService.loggedUser.role === UserRole.admin
    ) {
      return true;
    } else {
      this.router.navigateByUrl('home');
      return false;
    }
  }
}
