import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { distributeCards } from 'src/app/state/distribution/distribution.actions';
import {
  selectDistributionError,
  selectDistributionLoading,
} from 'src/app/state/distribution/distribution.selectors';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.loading$ = this.store.select(selectDistributionLoading);
    this.error$ = this.store.select(selectDistributionError);
  }

  distributeCards(quantity: string) {
    this.store.dispatch(
      distributeCards({
        distribution: {
          receivers: 'all',
          quantity: Number(quantity),
        },
      }),
    );
  }
}
