import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UserCard } from 'src/app/models/card.model';
import { modifyCard } from 'src/app/state/card/card.actions';

@Component({
  selector: 'app-initial-user-creation',
  templateUrl: 'initial.user.creation.component.html',
  styleUrls: ['initial.user.creation.component.scss'],
})
export class InitialUserCreationComponent {
  userForm = this.formBuilder.group({
    acronymInput: new FormControl(),
    startDateInput: new FormControl(),
    jobInput: new FormControl(),
    wishDestinationInput: new FormControl(),
    wishPersonInput: new FormControl(),
    wishSkillInput: new FormControl(),
    bestAdviceInput: new FormControl(),
  });

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<InitialUserCreationComponent>,
  ) {}

  onSubmit() {
    console.log('Form Value:', this.userForm.value);
  }

  updateUser(): void {
    this.store.dispatch(modifyCard({ userCard: this.mapFormToUser() }));
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
