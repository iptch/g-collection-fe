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
import { tap, take } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-initial-user-creation',
  templateUrl: 'initial.user.creation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialUserCreationComponent implements OnInit {
  @Input() cardId: number | null = null;

  userCardForm!: FormGroup;

  private readonly store = inject(Store);
  private readonly userService = inject(UserService);

  ngOnInit() {
    //TODO: Add data from init call ?
    this.userCardForm = new FormGroup({
      dateInput: new FormControl(''), // Date input
      textInput1: new FormControl(''), // First text input
      textInput2: new FormControl(''), // Second text input
      textInput3: new FormControl(''), // Third text input
    });

    if (this.cardId) {
      this.store.dispatch(loadCardById({ id: this.cardId }));
      //TODO: takeUntilDestroy
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
  }

  onSubmit() {
    console.log('Form Value:', this.userCardForm.value);
  }

  uploadPicture(data: EventTarget | null): void {
    if (!(data instanceof HTMLInputElement)) return;

    const file = data.files?.[0];
    if (!file) {
      console.error('No images to upload given!');
      return;
    }
    this.userService.uploadUserPicture(file).pipe(take(1)).subscribe();
  }
}
