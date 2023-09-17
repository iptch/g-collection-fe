import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { CardWithProfile } from 'src/app/models/card.model';
import { Code } from 'src/app/models/code.model';
import { loadCardById } from 'src/app/state/card/card.actions';
import {
  selectCardWithProfileById,
  selectCardWithProfileError,
  selectCardWithProfileLoading,
} from 'src/app/state/card/card.selectors';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
})
export class CardDetailComponent implements OnInit, OnDestroy {
  @ViewChild('image') image!: ElementRef;

  loading$?: Observable<boolean>;
  error$?: Observable<boolean>;
  card$?: Observable<CardWithProfile | undefined>;
  imageWidth!: number;
  initializedQrCode = false;
  showQrCode = false;

  private readonly destroy$ = new Subject();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(loadCardById({ id }));
    this.loading$ = this.store.select(selectCardWithProfileLoading);
    this.error$ = this.store.select(selectCardWithProfileError);
    this.card$ = this.store.select(selectCardWithProfileById(id));
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

  getCode(card: CardWithProfile): string {
    const code: Code = {
      id: card.id,
      giver: card.giver,
      otp: '123456', // TODO: use OTP from BE
    };
    return JSON.stringify(code);
  }
}
