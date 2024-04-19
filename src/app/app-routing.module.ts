import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { AdminComponent } from './components/admin/admin.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { CardsComponent } from './components/cards/cards.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QrScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { UserComponent } from './components/user/user.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { QuizSelectorComponent } from './components/quiz-selector/quiz-selector.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [MsalGuard],
    canActivateChild: [MsalGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'admin',
        component: AdminComponent,
      },
      {
        path: 'card',
        component: UserCardComponent,
      },
      {
        path: 'cards',
        component: CardsComponent,
      },
      {
        path: 'cards/:id',
        component: CardDetailComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'qr-scanner',
        component: QrScannerComponent,
      },
      {
        path: 'quiz',
        component: QuizSelectorComponent,
      },
      {
        path: 'quiz/question/:question/answer/:answer',
        component: QuizComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        // Needed for Error routing
        path: 'error',
        component: DashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabledNonBlocking'
          : 'disabled', // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
