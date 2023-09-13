import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card, Cards } from '../models/card.model';
import { Observable, map } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly cardsEndpoint = `${environment.backendUri}/cards`;

  constructor(private readonly http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http
      .get<Cards>(this.cardsEndpoint)
      .pipe(map((response) => response.results));
  }

  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.cardsEndpoint}/${id}`);
  }
}