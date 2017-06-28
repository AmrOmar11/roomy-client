import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule  } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing'

import { RoomyApp } from './app.component';
import { HomePage, HowitworksPage, InvitePage, PaymentPage, PromotionsPage, SettingsPage, MapPage,SearchPage, HotelsliderPage} from '../pages/pages';
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
    MapPage,
    SearchPage,
    HotelsliderPage
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
    MapPage,
    SearchPage,
    HotelsliderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    RoomyApi,
    Geolocation,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
