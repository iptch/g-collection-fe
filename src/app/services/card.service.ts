import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageService } from './image.service';
import { Card, Cards } from '../models/card.model';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private readonly cardsEndpoint = `${environment.backendUri}/cards`;

  constructor(
    private readonly http: HttpClient,
    private readonly imageService: ImageService,
  ) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Cards>(this.cardsEndpoint).pipe(
      switchMap((cards) => {
        const imageObservables = cards.results.map((card) =>
          this.imageService
            .getImageUrl(card.acronym)
            .then((url) => ({ ...card, imageUrl: url })),
        );
        return forkJoin(imageObservables);
      }),
    );
  }

  getCardById(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.cardsEndpoint}/${id}`).pipe(
      switchMap(async (card) => {
        const url = await this.imageService.getImageUrl(card.acronym);
        return { ...card, imageUrl: url };
      }),
    );
  }
}
