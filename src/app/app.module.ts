import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeDeCh from '@angular/common/locales/de-CH';
import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgOptimizedImage, registerLocaleData } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalRedirectComponent,
  MsalService,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  IPublicClientApplication,
  InteractionType,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { QRCodeModule } from 'angularx-qrcode';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { AlertComponent } from './components/alert/alert.component';
import { ButtonComponent } from './components/button/button.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { CardThumbnailComponent } from './components/card-thumbnail/card-thumbnail.component';
import { CardsComponent } from './components/cards/cards.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FieldComponent } from './components/field/field.component';
import { HeaderComponent } from './components/header/header.component';
import { EditUserCardComponent } from './components/edit-user-card/edit-user-card.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PanelComponent } from './components/panel/panel.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { QrScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { QuizQuestionComponent } from './components/quiz/quiz-question/quiz-question.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { TitleComponent } from './components/title/title.component';
import { UserComponent } from './components/user/user.component';
import { CardEffects } from './state/card/card.effects';
import { DashboardEffects } from './state/dashboard/dashboard.effects';
import { DistributionEffects } from './state/distribution/distribution.effects';
import { reducers } from './state/reducers';
import { TransferEffects } from './state/transfer/transfer.effects';
import { UserEffects } from './state/user/user.effects';
import { InitialCardCreationDialogComponent } from './components/initial-card-creation-dialog/initial-card-creation.dialog';
import { QuizEffects } from './state/quiz/quiz.effects';
import { PictureEffects } from './state/picture/picture.effects';

registerLocaleData(localeDeCh);

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function loggerCallback(_logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'dd268c17-3b91-47ab-bcb4-1f87f8a0129d',
      authority:
        'https://login.microsoftonline.com/a9080dcf-8589-4cb6-a2e2-21398dc6c671',
      redirectUri: environment.redirectUri,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.backendUri, [
    'api://ae04e6aa-6cb5-4c16-9d3b-45bd6a79845c/user_impersonation',
  ]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    UserComponent,
    QrScannerComponent,
    QrCodeComponent,
    NavigationComponent,
    LoaderComponent,
    TitleComponent,
    PanelComponent,
    ButtonComponent,
    CardsComponent,
    CardThumbnailComponent,
    CardDetailComponent,
    FieldComponent,
    AlertComponent,
    AdminComponent,
    EditUserCardComponent,
    UserCardComponent,
    InitialCardCreationDialogComponent,
    QuizComponent,
    QuizQuestionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MsalModule,
    QRCodeModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      CardEffects,
      DistributionEffects,
      DashboardEffects,
      UserEffects,
      TransferEffects,
      QuizEffects,
      PictureEffects,
    ]),
    MatSliderModule,
    MatSnackBarModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    NgOptimizedImage,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        panelClass: ['!absolute', '!bottom-14', '!m-0'],
      },
    },
    { provide: LOCALE_ID, useValue: 'de-CH' },
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
