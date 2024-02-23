import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { loadCardById } from 'src/app/state/card/card.actions';
import { Store } from '@ngrx/store';
import { selectCardWithUserById } from 'src/app/state/card/card.selectors';
import { tap } from 'rxjs';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-initial-user-creation',
  templateUrl: 'initial.user.creation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialUserCreationComponent implements OnInit {
  //TODO: Must be provided by the init information
  @Input() cardId = 217;

  user!: FormGroup;

  private readonly store = inject(Store);

  ngOnInit() {
    //TODO: Add data from init call ?
    this.user = new FormGroup({
      dateInput: new FormControl(''), // Date input
      textInput1: new FormControl(''), // First text input
      textInput2: new FormControl(''), // Second text input
      textInput3: new FormControl(''), // Third text input
    });

    this.store.dispatch(loadCardById({ id: this.cardId }));
    //TODO: takeUntilDestroyed
    this.store
      .select(selectCardWithUserById(this.cardId))
      .pipe(
        tap((cardData: Card) => {
          console.log('Got card data', cardData);
          //TODO: Fill form values
        }),
      )
      .subscribe();
  }

  onSubmit() {
    console.log('Form Value:', this.user.value);
  }
}
