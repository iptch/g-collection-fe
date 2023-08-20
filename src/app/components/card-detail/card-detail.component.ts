import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
})
export class CardDetailComponent implements OnInit {
  @ViewChild('image') image!: ElementRef;
  card$?: Observable<Card>;
  cardId!: number;
  imageWidth!: number;
  initializedQrCode = false;
  showQrCode = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private imageService: ImageService,
  ) {}

  ngOnInit(): void {
    this.cardId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCard();
  }

  toggleQrCode() {
    if (!this.initializedQrCode) {
      this.imageWidth = this.image.nativeElement.offsetWidth;
      this.initializedQrCode = true;
    }
    this.showQrCode = !this.showQrCode;
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }

  getCard() {
    this.card$ = this.http
      .get<Card>(`https://g-collection.azurewebsites.net/cards/${this.cardId}`)
      .pipe(
        switchMap(async (card) => {
          const url = await this.imageService.getImageUrl(card.acronym);
          return { ...card, imageUrl: url };
        }),
      );
  }
}
