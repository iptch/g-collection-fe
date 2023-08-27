import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(environment.msGraphUri);
  }
}
