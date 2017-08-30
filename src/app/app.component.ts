import { Component} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';
import { OneSignal } from '@ionic-native/onesignal';


@Component({
  templateUrl: 'app.html'
})
export class RoomyApp {  
  rootPage: any = 'PreviewPage';
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private nativeStorage: NativeStorage, public auth: AuthenticateProvider,private oneSignal: OneSignal
    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.loginFromNativeStorage(); 
      this.startOnesignal();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  loginFromNativeStorage(){
    if (this.platform.is('cordova')){
      this.nativeStorage.getItem('userdata')
      .then(data => {
          console.log(data);
          var inputData = {
            action: "SIGNIN",
            conactNumber: '',
            dob: '',
            emailId: '',
            gender: '',
            loginType: "TOKEN",
            name: "",
            otp: "",
            password: '',
            token: data,
            userID: 0
          };
          this.auth.login(inputData).subscribe(success => {
          if((success.status !== undefined)&&(success.status == '0001')) {
              this.auth.setCurrentUser(success);
              this.auth.setUserData(success);
              this.rootPage = 'HomePage';
            } else {
              this.rootPage = 'PreviewPage';
            }
          },
          error => {
            console.log(error);
            this.rootPage = 'PreviewPage';
          });
        },
        error => {
          console.log(error);
          this.rootPage = 'PreviewPage';
        }
      );
    }else{
      this.rootPage = 'PreviewPage';
    }
  }

  startOnesignal(){
    if (this.platform.is('cordova')){
      this.oneSignal.startInit('1ae97439-f217-446d-9ae5-8fefcfb36ed7', '17668287249');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
       // do something when notification is received
        // alert("recevied");
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
        // alert("opened");
      });
      this.oneSignal.endInit();
    }
  }

}
