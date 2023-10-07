import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashboardService } from '../../services/dashboard.service';
import { catchError, map, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as DashboardActions from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  readonly loadDashboard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      switchMap(() => {
        return this.dashboardService.getDashboardData().pipe(
          map((dashboard) =>
            DashboardActions.loadDashboardSuccess({ dashboard }),
          ),
          catchError((err) => {
            const errorMessage = err.status + ': ' + err.statusText;
            return of(
              DashboardActions.loadDashboardError({ error: errorMessage }),
            );
          }),
        );
      }),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly dashboardService: DashboardService,
  ) {}
}
