import { Component } from '@angular/core';

type NavigationItem = {
  routerLink: string;
  symbol: string;
};

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  navigationItems: NavigationItem[] = [
    { routerLink: 'qr-generator', symbol: 'qr_code' },
    { routerLink: 'qr-scanner', symbol: 'barcode_reader' },
    { routerLink: 'home', symbol: 'home' },
    { routerLink: 'cards', symbol: 'diversity_1' },
  ];
}
