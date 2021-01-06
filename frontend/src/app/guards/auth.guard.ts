import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private login: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    // validación de usuario logueado por medio del token
    return this.login.validarToken().pipe(
      tap((isAutenticated) => {
        // En caso de no tener token se redirecciona al login
        if (!isAutenticated) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
