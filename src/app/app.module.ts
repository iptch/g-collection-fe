import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { isDevMode, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { environment } from './../environments/environment';
import { QrScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { QRCodeModule } from 'angularx-qrcode';
import { QrCodeComponent } from './components/qr-code/qr-code.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TitleComponent } from './components/title/title.component';
import { PanelComponent } from './components/panel/panel.component';
import { ButtonComponent } from './components/button/button.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardThumbnailComponent } from './components/card-thumbnail/card-thumbnail.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { FieldComponent } from './components/field/field.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './state/dashboard/dashboard.effects';
import { reducers } from './state/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CardEffects } from './state/card/card.effects';
import { AlertComponent } from './components/alert/alert.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AdminComponent } from './components/admin/admin.component';
import { DistributionEffects } from './state/distribution/distribution.effects';
import { MatSliderModule } from '@angular/material/slider';
import { UserEffects } from './state/user/user.effects';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

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
  protectedResourceMap.set(GRAPH_ENDPOINT, ['user.read']);
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
    ]),
    MatButtonToggleModule,
    MatSliderModule,
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
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
