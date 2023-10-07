import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from '../models/dashboard.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private readonly http: HttpClient) {}

  getDashboardData(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${environment.backendUri}/overview`);
  }
}
