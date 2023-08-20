import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import {
  loadProfile,
  loadProfileError,
  loadProfileSuccess,
} from './profile.actions';

@Injectable()
export class ProfileEffects {
  readonly loadProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProfile),
      switchMap(() =>
        this.profileService.getProfile().pipe(
          map((profile) => loadProfileSuccess({ profile })),
          catchError(() => of(loadProfileError)),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
  ) {}
}
