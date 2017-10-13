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
import { SuperTabsModule } from 'ionic2-super-tabs';
import { Keyboard } from '@ionic-native/keyboard';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    RoomyApp,
    SearchPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SuperTabsModule.forRoot(),
    IonicModule.forRoot(RoomyApp,{
        backButtonIcon: 'close',
        backButtonText: '',
        platforms : {
          scrollPadding:false,
          scrollAssist:false,
          autoFocusAssist:false
        }
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
    SocialSharing,
    Keyboard,
    Diagnostic,
    Network
  ]
})
export class AppModule {}
