import {
  ChangeDetectionStrategy,
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
import { tap } from 'rxjs';
import { Card, UserCard } from 'src/app/models/card.model';
import { loadCardById } from 'src/app/state/card/card.actions';
import { selectCardWithUserById } from 'src/app/state/card/card.selectors';
import {
  getPicture,
  uploadPicture,
} from 'src/app/state/picture/picture.actions';
import {
  selectPicture,
  selectPictureError,
  selectPictureLoading,
} from 'src/app/state/picture/picture.selectors';

@Component({
  selector: 'app-edit-user-card',
  templateUrl: 'edit-user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserCardComponent implements OnInit {
  @Input() cardId: number | null = null;
  @Output() save = new EventEmitter<UserCard>();

  jobs = [
    'Assistant to the Chief of Staff',
    'Associate Partner',
    'Associate Partner, Backoffice',
    'Backoffice',
    'Board of Directors',
    'Buisiness Operations',
    'Chief of Staff',
    'Consultant',
    'IT Architect',
    'Junior Software Engineer',
    'Lead Consultant',
    'Marketing',
    'Partner',
    'People & Development',
    'Principal Architect',
    'Principal Architect / Director',
    'Principal Consultant / Director',
    'Senior Consultant',
  ];

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
  private readonly destroyRef = inject(DestroyRef);

  pictureLoading$ = this.store.select(selectPictureLoading);
  pictureError$ = this.store.select(selectPictureError);
  picture$ = this.store.select(selectPicture);

  constructor(private formBuilder: FormBuilder) {
    this.store.dispatch(getPicture());
  }

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
    this.store.dispatch(uploadPicture({ file }));
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
