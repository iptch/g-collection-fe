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
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { Card, UserCard } from 'src/app/models/card.model';
import { loadCardById } from 'src/app/state/card/card.actions';
import {
  selectCardError,
  selectCardLoading,
  selectCardModifying,
  selectCardWithUserById,
} from 'src/app/state/card/card.selectors';
import {
  getPicture,
  setImageUrl,
  uploadPicture,
} from 'src/app/state/picture/picture.actions';
import {
  selectPicture,
  selectPictureError,
  selectPictureLoading,
} from 'src/app/state/picture/picture.selectors';
import { forbiddenUrlValidator } from './forbidden-url.directive';

@Component({
  selector: 'app-edit-user-card',
  templateUrl: 'edit-user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserCardComponent implements OnInit {
  @Input() cardId: number | null = null;
  @Output() save = new EventEmitter<UserCard>();

  jobs = [
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

  private readonly imageFallbackUrl = 'assets/icon.png';
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  userForm = this.formBuilder.group({
    imageInput: new FormControl('', [
      Validators.required,
      forbiddenUrlValidator(this.imageFallbackUrl),
    ]),
    acronymInput: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
    ]),
    startDateInput: new FormControl('', Validators.required),
    jobInput: new FormControl('', Validators.required),
    wishDestinationInput: new FormControl('', Validators.required),
    wishPersonInput: new FormControl('', Validators.required),
    wishSkillInput: new FormControl('', Validators.required),
    bestAdviceInput: new FormControl('', Validators.required),
  });

  cardLoading$ = this.store.select(selectCardLoading);
  cardModifying$ = this.store.select(selectCardModifying);
  cardError$ = this.store.select(selectCardError);
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
    this.picture$
      .pipe(
        tap((image_url) => this.userForm.patchValue({ imageInput: image_url })),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  onImageMissing(): void {
    this.store.dispatch(setImageUrl({ image_url: this.imageFallbackUrl }));
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
      acronym: userFormControls.acronymInput.value!,
      job: userFormControls.jobInput.value!,
      start_at_ipt: userFormControls.startDateInput.value!,
      wish_destination: userFormControls.wishDestinationInput.value!,
      wish_person: userFormControls.wishPersonInput.value!,
      wish_skill: userFormControls.wishSkillInput.value!,
      best_advice: userFormControls.bestAdviceInput.value!,
    };
  }
}
