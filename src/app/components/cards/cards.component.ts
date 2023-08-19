import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { ImageService } from 'src/app/services/image.service';

type Cards = {
  results: Card[];
};

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit {
  cards$?: Observable<Cards>;

  constructor(
    private http: HttpClient,
    private imageService: ImageService,
  ) {}

  ngOnInit(): void {
    this.getCards();
  }

  getCards() {
    this.cards$ = this.http
      .get<Cards>('https://g-collection.azurewebsites.net/cards')
      .pipe(
        switchMap((cards) => {
          const imageObservables = cards.results.map((card) =>
            this.imageService
              .getImageUrl(card.acronym)
              .then((url) => ({ ...card, imageUrl: url })),
          );
          return forkJoin(imageObservables).pipe(
            map((results) => ({ results })),
          );
        }),
      );
  }
}
