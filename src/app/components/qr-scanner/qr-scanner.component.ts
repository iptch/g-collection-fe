import { Component, OnDestroy, OnInit } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
})
export class QrScannerComponent implements OnInit, OnDestroy {
  private qrScanner!: Html5Qrcode;
  message?: string;

  ngOnInit(): void {
    this.qrScanner = new Html5Qrcode('qr-scanner');
    this.qrScanner
      .start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: 250,
        },
        (qrCodeMessage) => {
          this.message = qrCodeMessage;
        },
        () => {
          // QR Code no longer in front of camera
        },
      )
      .catch((err) => {
        console.log(`Unable to start scanning, error: ${err}`);
      });
  }

  clearMessage(): void {
    this.message = '';
  }

  ngOnDestroy(): void {
    if (this.qrScanner) {
      this.qrScanner
        .stop()
        .catch((err) => console.log('Error stopping the scanner', err));
    }
  }
}
