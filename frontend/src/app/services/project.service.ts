import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const base_url: String = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createProject(project: any): Observable<any> {
    const token = this.authService.token;
    console.log(project);

    return this.http.post(`${base_url}project/createProject`, project, {
      headers: {
        'x-token': token,
      },
    });
  }

  getProjects(): Observable<any> {
    const token = this.authService.token;
    return this.http.get(`${base_url}project/getProjects`, {
      headers: {
        'x-token': token,
      },
    });
  }
}
