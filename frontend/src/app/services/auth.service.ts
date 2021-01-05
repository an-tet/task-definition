import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const base_url: String = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  verifyLogin(login: any): Observable<any> {
    return this.http.post(`${base_url}auth/login`, login);
  }

  signIn(signIn): Observable<any> {
    return this.http.post(`${base_url}auth/signIn`, signIn);
  }
}
