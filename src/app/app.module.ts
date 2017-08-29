import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule  } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Network } from '@ionic-native/network';
import { RoomyApp } from './app.component';
import { ForgetModalPageModule } from '../pages/forget-modal/forget-modal.module';
import { InvitePageModule } from '../pages/invite/invite.module';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticateProvider,HotelsProvider,FacebookLoginService,GoogleLoginService } from '../providers/providers';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { OneSignal } from '@ionic-native/onesignal';

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': '9187f137',
    },
    'push': {
        'sender_id': '596958727411',
        'pluginConfig': {
            'ios': {
                'badge': true,
                'sound': true
            },
            'android': {
                'iconColor': '#343434'
            }
        }
    }
};

@NgModule({
    declarations: [
        RoomyApp
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(RoomyApp,{
            backButtonIcon: 'close',
            backButtonText: '',
        }),
        CloudModule.forRoot(cloudSettings),
        ForgetModalPageModule,
        InvitePageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        RoomyApp
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
        GooglePlus,
        AuthenticateProvider,
        Network,
        OneSignal
    ]
})
export class AppModule {}
