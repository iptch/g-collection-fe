import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Html5Qrcode,
  Html5QrcodeCameraScanConfig,
  Html5QrcodeScannerState,
} from 'html5-qrcode';
import { Observable } from 'rxjs';
import { Code } from 'src/app/models/code.model';
import {
  transferCard,
  resetTransferCode,
  startScanner,
  startScannerSuccess,
  startScannerError,
} from 'src/app/state/transfer/transfer.actions';
import {
  selectTransferLoading,
  selectTransferError,
  selectTransferCode,
} from 'src/app/state/transfer/transfer.selectors';
import { environment } from 'src/environments/environment';

const cameraConfig = { facingMode: 'environment' };

const qrScannerConfig: Html5QrcodeCameraScanConfig = {
  fps: 10,
  qrbox: 250,
  aspectRatio: 1,
};

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
})
export class QrScannerComponent implements OnInit, OnDestroy {
  code$: Observable<Code | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  bypassEnabled = environment.scannerBypass;
  private qrScanner!: Html5Qrcode;
  private destroyed = false;

  constructor(private readonly store: Store) {
    this.code$ = this.store.select(selectTransferCode);
    this.loading$ = this.store.select(selectTransferLoading);
    this.error$ = this.store.select(selectTransferError);
  }

  ngOnInit(): void {
    this.qrScanner = new Html5Qrcode('qr-scanner');
    this.startScanning();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.qrScanner.getState() !== Html5QrcodeScannerState.NOT_STARTED) {
      this.stopScanning();
    }
  }

  startScanning(): void {
    if (this.bypassEnabled) return;
    this.store.dispatch(startScanner());
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
        } else {
          this.store.dispatch(startScannerSuccess());
        }
      })
      .catch((error) => this.store.dispatch(startScannerError({ error })));
  }

  stopScanning(): void {
    if (this.bypassEnabled) return;
    this.qrScanner
      .stop()
      .catch((error) => console.log('Error stopping the scanner', error));
  }

  resumeScanning(): void {
    this.store.dispatch(resetTransferCode());
    this.startScanning();
  }

  parseCode(qrText: string): void {
    const parsedObject = JSON.parse(qrText);
    if (this.isCode(parsedObject)) {
      this.stopScanning();
      this.store.dispatch(transferCard({ code: parsedObject }));
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
