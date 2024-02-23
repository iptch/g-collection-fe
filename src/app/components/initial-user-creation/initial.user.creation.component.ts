import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take, tap, map, switchMap, filter } from 'rxjs';
import { Card, UserCard } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { loadCardById, modifyCard } from 'src/app/state/card/card.actions';
import {
  selectCardById,
  selectCardWithUserById,
} from 'src/app/state/card/card.selectors';
import { selectUser } from 'src/app/state/user/user.selectors';

@Component({
  selector: 'app-initial-user-creation',
  templateUrl: 'initial.user.creation.component.html',
  styleUrls: ['initial.user.creation.component.scss'],
})
export class InitialUserCreationComponent implements OnInit {
  @Input() cardId: number | null = null;
  @Output() save = new EventEmitter<UserCard>();

  userForm = this.formBuilder.group({
    acronymInput: new FormControl(),
    startDateInput: new FormControl(),
    jobInput: new FormControl(),
    wishDestinationInput: new FormControl(),
    wishPersonInput: new FormControl(),
    wishSkillInput: new FormControl(),
    bestAdviceInput: new FormControl(),
  });

  private readonly store = inject(Store);
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  userImage$ = this.store.select(selectUser).pipe(
    filter(Boolean),
    switchMap((user: User) => this.store.select(selectCardById(user.card_id))),
    filter(Boolean),
    map((card: Card) => card.image_url),
  );

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    if (this.cardId) {
      this.store.dispatch(loadCardById({ id: this.cardId }));
      this.store
        .select(selectCardWithUserById(this.cardId))
        .pipe(
          tap((cardData: Card) => {
            this.userForm.patchValue({
              acronymInput: cardData.acronym,
              startDateInput: cardData.start_at_ipt,
              jobInput: cardData.job,
              wishDestinationInput: cardData.wish_destination,
              wishPersonInput: cardData.wish_person,
              wishSkillInput: cardData.wish_skill,
              bestAdviceInput: cardData.best_advice,
            });
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe();
    }
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

  updateUser(): void {
    this.save.emit(this.mapFormToUser());
  }

  mapFormToUser(): UserCard {
    const userFormControls = this.userForm.controls;

    return {
      acronym: userFormControls.acronymInput.value,
      job: userFormControls.jobInput.value,
      start_at_ipt: userFormControls.startDateInput.value,
      wish_destination: userFormControls.wishDestinationInput.value,
      wish_person: userFormControls.wishPersonInput.value,
      wish_skill: userFormControls.wishSkillInput.value,
      best_advice: userFormControls.bestAdviceInput.value,
    };
  }
}
