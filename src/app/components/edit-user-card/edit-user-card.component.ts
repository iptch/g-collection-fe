import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
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
  selectCardWithUserById,
} from 'src/app/state/card/card.selectors';
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
  @ViewChild('image') image: ElementRef | undefined;

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

  private readonly fallbackImageUrl = 'assets/icon.png';
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  cardLoading$ = this.store.select(selectCardLoading);
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
  }

  onImageMissing(image: HTMLImageElement): void {
    image.src = this.fallbackImageUrl;
  }

  isCardInvalid(): boolean {
    return !(
      this.userForm.valid &&
      !this.image?.nativeElement.src.endsWith(this.fallbackImageUrl)
    );
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
