import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as PictureActions from './picture.actions';
import { PictureService } from 'src/app/services/picture.service';
import { of } from 'rxjs';

@Injectable()
export class PictureEffects {
  readonly getPicture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PictureActions.getPicture),
      switchMap(() =>
        this.pictureService.getUserPicture().pipe(
          map((image_url) => PictureActions.getPictureSuccess({ image_url })),
          catchError((error) =>
            of(
              PictureActions.getPictureFailed({
                error: error.error.status ? error.error.status : error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  readonly uploadPicture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PictureActions.uploadPicture),
      switchMap(({ file }) =>
        this.pictureService.uploadUserPicture(file).pipe(
          map((image_url) =>
            PictureActions.uploadPictureSuccess({ image_url }),
          ),
          catchError((error) =>
            of(
              PictureActions.uploadPictureFailed({
                error: error.error.status ? error.error.status : error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly pictureService: PictureService,
  ) {}
}
