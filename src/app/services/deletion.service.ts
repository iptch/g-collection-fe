import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StatusResponse } from '../models/status-response.model';

@Injectable({
  providedIn: 'root',
})
export class deletionService {
  private readonly deletionEndpoint = `${environment.backendUri}/delete-user-and-card/`;

  constructor(private readonly http: HttpClient) {}

  deleteUser(email: string): Observable<StatusResponse> {
    return this.http.delete<StatusResponse>(this.deletionEndpoint, {
      body: { user_to_delete: email },
    });
  }
}
