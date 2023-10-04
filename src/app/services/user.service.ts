import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly usersEndpoint = `${environment.backendUri}/users`;

  constructor(private readonly http: HttpClient) {}

  initUser(): Observable<UserApiResponse> {
    return this.http.post<UserApiResponse>(this.usersEndpoint + '/init/', {});
  }
}

interface UserApiResponse {
  status: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    is_admin: boolean;
  };
  last_login: string;
}
