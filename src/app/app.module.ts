import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule  } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

import { RoomyApp } from './app.component';
import { HomePage, HowitworksPage, InvitePage, PaymentPage, PromotionsPage, SettingsPage} from '../pages/pages';
import { RoomyApi } from '../shared/shared';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    RoomyApp,
    HomePage,
    HowitworksPage,
    InvitePage,
    PaymentPage,
    PromotionsPage,
    SettingsPage
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(RoomyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDRkKSDHE-AvGKLjoIoymRZIaQGQ2sUEAs'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RoomyApp,
    HomePage,
    HowitworksPage,
    InvitePage,
    PaymentPage,
    PromotionsPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    RoomyApi,
    Geolocation,
    AgmCoreModule, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
