import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  private readonly pictureEndpoint = `${environment.backendUri}/picture/`;

  constructor(private readonly http: HttpClient) {}

  getUserPicture(): Observable<string> {
    return this.http.get<string>(this.pictureEndpoint);
  }

  uploadUserPicture(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(this.pictureEndpoint, formData);
  }
}
