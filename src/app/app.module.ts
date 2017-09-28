import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpModule  } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { RoomyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticateProvider,FacebookLoginService,GoogleLoginService } from '../providers/providers';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SearchPage } from '../pages/pages';

@NgModule({
  declarations: [
    RoomyApp,
    SearchPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(RoomyApp,{
        backButtonIcon: 'close',
        backButtonText: '',
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RoomyApp,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FacebookLoginService,
    GoogleLoginService,
    NativeStorage,
    Facebook,
    GooglePlus,
    AuthenticateProvider,
    SocialSharing
  ]
})
export class AppModule {}
