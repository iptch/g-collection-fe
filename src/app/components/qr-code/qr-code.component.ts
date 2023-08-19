import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-code.component.html',
})
export class QrCodeComponent {
  @Input() qrData!: string;
  @Input() width!: number;
}
