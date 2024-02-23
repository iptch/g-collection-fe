import { Component, Input, OnInit, Optional, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { Card, UserCard } from 'src/app/models/card.model';
import { UserService } from 'src/app/services/user.service';
import { loadCardById, modifyCard } from 'src/app/state/card/card.actions';
import { selectCardWithUserById } from 'src/app/state/card/card.selectors';

@Component({
  selector: 'app-initial-user-creation',
  templateUrl: 'initial.user.creation.component.html',
  styleUrls: ['initial.user.creation.component.scss'],
})
export class InitialUserCreationComponent implements OnInit {
  @Input() cardId: number | null = null;

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

  constructor(
    private formBuilder: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<InitialUserCreationComponent>,
  ) {}

  ngOnInit() {
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
    this.store.dispatch(
      modifyCard({ userCard: this.mapFormToUser(), dialogRef: this.dialogRef }),
    );
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
