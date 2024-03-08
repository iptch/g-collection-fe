import {
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { deleteUser } from 'src/app/state/deletion/deletion.actions';
import {
  selectDeletionEmail,
  selectDeletionLoading,
} from 'src/app/state/deletion/deletion.selectors';
import { distributeCards } from 'src/app/state/distribution/distribution.actions';
import { selectDistributionLoading } from 'src/app/state/distribution/distribution.selectors';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  @ViewChild('formDirective') formDirective?: FormGroupDirective;

  private readonly destroyRef = inject(DestroyRef);

  distributing$ = this.store.select(selectDistributionLoading);
  deleting$ = this.store.select(selectDeletionLoading);

  deletionForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private readonly store: Store,
    private readonly formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectDeletionEmail)
      .pipe(
        tap((email) => {
          // Only reset form, if deletion was successful
          if (!email) this.formDirective?.resetForm();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  distributeCards(quantity: string) {
    this.store.dispatch(
      distributeCards({
        distribution: {
          receivers: 'all',
          quantity: Number(quantity),
        },
      }),
    );
  }

  deleteUser(): void {
    this.store.dispatch(
      deleteUser({ email: this.deletionForm.controls.email.value! }),
    );
  }
}
