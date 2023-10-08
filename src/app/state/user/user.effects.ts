import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as userActions from './user.actions';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  readonly initUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.initUser),
      mergeMap(() =>
        this.userService.initUser().pipe(
          map((user) => {
            return userActions.initUserSuccess({ user });
          }),
          catchError((error) => {
            return of(userActions.initUserFailed({ error: error.message }));
          }),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
  ) {}
}
