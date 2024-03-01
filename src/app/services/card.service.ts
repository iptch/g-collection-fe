import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card, UserCard } from '../models/card.model';
import { Code } from '../models/code.model';
import { StatusResponse } from '../models/status-response.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly cardsEndpoint = `${environment.backendUri}/cards`;

  constructor(private readonly http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardsEndpoint);
  }

  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.cardsEndpoint}/${id}`);
  }

  transferCard(code: Code): Observable<StatusResponse> {
    return this.http.post<StatusResponse>(
      `${this.cardsEndpoint}/transfer/`,
      code,
    );
  }

  modifyCard(userCard: UserCard): Observable<number> {
    return this.http.post<number>(`${this.cardsEndpoint}/modify/`, userCard);
  }
}
