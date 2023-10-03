import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersEndpoint = `${environment.backendUri}/users`;

  constructor(private readonly http: HttpClient) {}

  initUser(): Observable<User> {
    return this.http.post<User>(this.usersEndpoint + '/init/', {});
  }
}
