import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageService } from './image.service';
import { Card, Cards } from '../models/card.model';
import { Observable, forkJoin, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(
    private http: HttpClient,
    private imageService: ImageService,
  ) {}

  getCards(): Observable<Card[]> {
    return this.http
      .get<Cards>('https://g-collection.azurewebsites.net/cards')
      .pipe(
        switchMap((cards) => {
          const imageObservables = cards.results.map(
            (card) =>
              this.imageService
                .getImageUrl(card.acronym)
                .then((url) => ({ ...card, imageUrl: url, id: 1 })), //TODO: get id from backend
          );
          return forkJoin(imageObservables);
        }),
      );
  }

  getCardById(id: number): Observable<Card> {
    return this.http
      .get<Card>(`https://g-collection.azurewebsites.net/cards/${id}`)
      .pipe(
        switchMap(async (card) => {
          const url = await this.imageService.getImageUrl(card.acronym);
          return { ...card, imageUrl: url, id: 1 }; //TODO: get id from backend
        }),
      );
  }
}
