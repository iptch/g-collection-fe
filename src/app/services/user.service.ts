import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersEndpoint = `${environment.backendUri}/users`;

  constructor(private readonly http: HttpClient) {}

  initUser(): Observable<void> {
    return this.http.post<void>(this.usersEndpoint + '/init/', {});
  }
}
