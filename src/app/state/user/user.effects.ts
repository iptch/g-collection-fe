import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  readonly loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(() =>
        this.userService.initUser().pipe(
          map((user) => UserActions.loadUserSuccess({ user })),
          catchError(() => of(UserActions.loadUserError())),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
  ) {}
}
