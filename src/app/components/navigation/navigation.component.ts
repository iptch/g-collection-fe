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
    { routerLink: 'qr-scanner', symbol: 'qr_code_scanner', text: 'Scanner' },
    { routerLink: 'dashboard', symbol: 'speed', text: 'Dashboard' },
    { routerLink: 'cards', symbol: 'diversity_1', text: 'Chärtli' },
    { routerLink: 'quiz', symbol: 'quiz', text: 'Quiz' },
  ];
}
