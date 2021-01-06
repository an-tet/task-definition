import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const base_url: String = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn: User;
  token: string;
  constructor(private http: HttpClient) {}

  verifyLogin(login: any): Observable<any> {
    return this.http.post(`${base_url}auth/login`, login).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  signIn(signIn): Observable<any> {
    return this.http.post(`${base_url}auth/signIn`, signIn);
  }

  recoveryData(email: string): Observable<any> {
    return this.http
      .post(`${base_url}auth/recoveryData`, { email })
      .pipe(map((resp: any) => resp.ok));
  }

  validarToken(): Observable<boolean> {
    const token: string = this.readToken();
    return this.http
      .get(`${base_url}auth/renewToken`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          const { email, password, _id } = resp.user;

          this.userLoggedIn = new User(email, password, _id, resp.token);

          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      );
  }

  readToken(): string {
    this.token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';
    return this.token;
  }
}
