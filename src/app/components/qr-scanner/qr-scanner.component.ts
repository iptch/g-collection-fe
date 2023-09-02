import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Html5Qrcode,
  Html5QrcodeCameraScanConfig,
  Html5QrcodeScannerState,
} from 'html5-qrcode';

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
  private qrScanner!: Html5Qrcode;
  message?: string;

  ngOnInit(): void {
    this.qrScanner = new Html5Qrcode('qr-scanner');
    this.startScanning();
  }

  ngOnDestroy(): void {
    if (this.qrScanner.getState() !== Html5QrcodeScannerState.NOT_STARTED) {
      this.qrScanner
        .stop()
        .catch((err) => console.log('Error stopping the scanner', err));
    }
  }

  startScanning(): void {
    this.qrScanner
      .start(
        cameraConfig,
        qrScannerConfig,
        (qrCodeMessage) => {
          this.message = qrCodeMessage;
          this.stopScanning();
        },
        () => {
          // QR Code no longer in front of camera
        },
      )
      .catch((err) => {
        console.log(`Unable to start scanning, error: ${err}`);
      });
  }

  stopScanning(): void {
    this.qrScanner.stop();
  }

  resumeScanning(): void {
    this.message = '';
    this.startScanning();
  }
}
