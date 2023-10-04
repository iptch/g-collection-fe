import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserIsAdmin } from '../../state/user/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isAdmin$: Observable<boolean | undefined>;

  constructor(private readonly store: Store) {
    this.isAdmin$ = this.store.select(selectUserIsAdmin);
  }
}
