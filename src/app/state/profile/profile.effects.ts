import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  readonly loadProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.loadProfile),
      switchMap(() =>
        this.profileService.getProfile().pipe(
          map((profile) => ProfileActions.loadProfileSuccess({ profile })),
          catchError(() => of(ProfileActions.loadProfileError)),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly profileService: ProfileService,
  ) {}
}
