import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CardService } from 'src/app/services/card.service';
import { catchError, map, of, switchMap } from 'rxjs';
import * as CardActions from './card.actions';

@Injectable()
export class CardEffects {
  readonly loadCards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardActions.loadCards),
      switchMap(() =>
        this.cardService.getCards().pipe(
          map((cards) => CardActions.loadCardsSuccess({ cards })),
          catchError(() => of(CardActions.loadCardsError)),
        ),
      ),
    );
  });

  readonly loadCardById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardActions.loadCardById),
      switchMap(({ id }) =>
        this.cardService.getCardById(id).pipe(
          map((card) => CardActions.loadCardByIdSuccess({ card })),
          catchError(() => of(CardActions.loadCardByIdError)),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly cardService: CardService,
  ) {}
}
