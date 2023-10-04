import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/user/user.selectors';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  user$: Observable<User | null>;

  constructor(private readonly store: Store) {
    this.user$ = this.store.select(selectUser);
  }
}
