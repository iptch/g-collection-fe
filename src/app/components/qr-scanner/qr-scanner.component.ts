import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Html5Qrcode,
  Html5QrcodeCameraScanConfig,
  Html5QrcodeScannerState,
} from 'html5-qrcode';
import { Subscription } from 'rxjs';
import { Code } from 'src/app/models/code.model';
import { CardService } from 'src/app/services/card.service';
import { environment } from 'src/environments/environment';

const cameraConfig = { facingMode: 'environment' };

const qrScannerConfig: Html5QrcodeCameraScanConfig = {
  fps: 10,
  qrbox: 250,
};

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
})
export class QrScannerComponent implements OnInit, OnDestroy {
  code?: Code;
  error?: string;
  bypassEnabled = environment.scannerBypass;
  private destroyed = false;
  private qrScanner!: Html5Qrcode;
  private tradeSubscription: Subscription | null = null;

  constructor(
    private cardService: CardService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.qrScanner = new Html5Qrcode('qr-scanner');
    this.startScanning();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.qrScanner.getState() !== Html5QrcodeScannerState.NOT_STARTED) {
      this.stopScanning();
    }
    this.tradeSubscription?.unsubscribe();
  }

  startScanning(): void {
    if (this.bypassEnabled) return;
    this.qrScanner
      .start(
        cameraConfig,
        qrScannerConfig,
        (qrText) => this.parseCode(qrText),
        undefined, // QR Code no longer in front of camera
      )
      .then(() => {
        // If component is already destroyed by the time scanner starts, stop it immediately
        if (this.destroyed) {
          this.stopScanning();
        }
      })
      .catch((err) => {
        console.log(`Unable to start scanning, error: ${err}`);
      });
  }

  stopScanning(): void {
    if (this.bypassEnabled) return;
    this.qrScanner
      .stop()
      .catch((err) => console.log('Error stopping the scanner', err));
  }

  resumeScanning(): void {
    this.code = undefined;
    this.error = undefined;
    this.startScanning();
  }

  parseCode(qrText: string): void {
    const parsedObject = JSON.parse(qrText);
    if (this.isCode(parsedObject)) {
      this.code = parsedObject;
      this.stopScanning();

      this.tradeSubscription = this.cardService
        .transferCard(this.code)
        .subscribe({
          next: (response) => {
            console.info(response.status);
            this.router.navigate(['/cards', `${parsedObject.id}`]);
          },
          error: (error) => (this.error = error.error.status),
        });
    } else {
      console.error('Parsed object is not of type Code', parsedObject);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isCode(obj: any): obj is Code {
    return (
      typeof obj.id === 'number' &&
      typeof obj.giver === 'string' &&
      typeof obj.otp === 'string'
    );
  }

  bypassCodeValueChanged(value: string) {
    this.parseCode(value);
  }
}
