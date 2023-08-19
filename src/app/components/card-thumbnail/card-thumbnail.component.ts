import { Component, Input } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-card-thumbnail',
  templateUrl: './card-thumbnail.component.html',
})
export class CardThumbnailComponent {
  @Input() card!: Card;
}
