import { Component } from '@angular/core';

type NavigationItem = {
  routerLink: string;
  symbol: string;
  text: string;
};

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  navigationItems: NavigationItem[] = [
    { routerLink: 'qr-scanner', symbol: 'barcode_reader', text: 'Scanner' },
    { routerLink: 'home', symbol: 'home', text: 'Home' },
    { routerLink: 'cards', symbol: 'diversity_1', text: 'Chärtli' },
  ];
}
