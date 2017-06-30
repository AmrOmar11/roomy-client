import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule  } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { RoomyApp } from './app.component';
import { HomePage, HowitworksPage, InvitePage, PaymentPage, PromotionsPage, SettingsPage, MapPage,SearchPage, HotelsliderPage,LoginPage,FacebookLoginPage,GoogleLoginPage} from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HotelsProvider,FacebookLoginService,GoogleLoginService } from '../providers/providers';

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
    HotelsliderPage,
    LoginPage,
    FacebookLoginPage,
    GoogleLoginPage
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
    HotelsliderPage,
    LoginPage,
    FacebookLoginPage,
    GoogleLoginPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    Geolocation,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HotelsProvider,
    FacebookLoginService,
    GoogleLoginService,
    NativeStorage,
    Facebook,
    GooglePlus
  ]
})
export class AppModule {}
