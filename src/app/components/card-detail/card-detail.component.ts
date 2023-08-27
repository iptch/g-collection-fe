import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { Code } from 'src/app/models/code.model';
import { Profile } from 'src/app/models/profile.model';
import { loadCardById } from 'src/app/state/card/card.actions';
import {
  selectCardById,
  selectCardLoading,
} from 'src/app/state/card/card.selectors';
import {
  selectProfile,
  selectProfileLoading,
} from 'src/app/state/profile/profile.selectors';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
})
export class CardDetailComponent implements OnInit, OnDestroy {
  @ViewChild('image') image!: ElementRef;

  cardLoading$?: Observable<boolean>;
  profileLoading$?: Observable<boolean>;
  card$?: Observable<Card | undefined>;
  profile$?: Observable<Profile | undefined>;
  cardId!: number;
  userPrincipalName!: string;
  imageWidth!: number;
  initializedQrCode = false;
  showQrCode = false;

  private readonly destroy$ = new Subject();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.cardId = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadCardById({ id: this.cardId }));
    this.cardLoading$ = this.store.select(selectCardLoading);
    this.profileLoading$ = this.store.select(selectProfileLoading);
    this.card$ = this.store.select(selectCardById(this.cardId));
    this.profile$ = this.store.select(selectProfile);
    this.profile$.pipe(takeUntil(this.destroy$)).subscribe((profile) => {
      if (profile) {
        this.userPrincipalName = profile.userPrincipalName;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  toggleQrCode(): void {
    if (!this.initializedQrCode) {
      this.imageWidth = this.image.nativeElement.offsetWidth;
      this.initializedQrCode = true;
    }
    this.showQrCode = !this.showQrCode;
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  getCode(): string {
    const code: Code = {
      id: this.cardId,
      userPrincipalName: this.userPrincipalName,
      otp: '123456',
    };
    return JSON.stringify(code);
  }
}
