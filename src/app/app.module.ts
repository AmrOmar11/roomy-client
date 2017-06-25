import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule  } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

import { RoomyApp } from './app.component';
import { HomePage, HowitworksPage, InvitePage, PaymentPage, PromotionsPage, SettingsPage, MapPage} from '../pages/pages';
import { RoomyApi } from '../shared/shared';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    RoomyApp,
    HomePage,
    HowitworksPage,
    InvitePage,
    PaymentPage,
    PromotionsPage,
    SettingsPage,
    MapPage
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(RoomyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RoomyApp,
    HomePage,
    HowitworksPage,
    InvitePage,
    PaymentPage,
    PromotionsPage,
    SettingsPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    RoomyApi,
    Geolocation,
    MapPage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
