import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Distribution } from '../models/distribution.model';
import { StatusResponse } from '../models/status-response.model';

@Injectable({
  providedIn: 'root',
})
export class DistributionService {
  private readonly distributionEndpoint = `${environment.backendUri}/distribute/`;

  constructor(private readonly http: HttpClient) {}

  distributeCards(distribution: Distribution): Observable<StatusResponse> {
    return this.http.post<StatusResponse>(
      this.distributionEndpoint,
      distribution,
    );
  }
}
