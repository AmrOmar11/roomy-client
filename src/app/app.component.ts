import { Component} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { AuthenticateProvider } from '../providers/authenticate/authenticate';



//declare var FCMPlugin;
@Component({
  templateUrl: 'app.html'
})
export class RoomyApp {
  
  rootPage: any = 'PreviewPage';
  userData:any;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private nativeStorage: NativeStorage, public auth: AuthenticateProvider
    ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.nativeStorage.getItem('userdata')
      .then(data => {
          console.log(data)
          this.userData = data;
        },
        error => console.error(error)
      );

      if (this.userData) {
        this.auth.login(this.userData).subscribe(success => {
          if((success.statusCode !== undefined)&&(success.statusCode == 0)) {        
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
      } else {
        this.rootPage = 'PreviewPage';
      }
      //document.addEventListener("deviceready", onDeviceReady, false);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // function onDeviceReady() {
      //    if(window["plugins"] != undefined){
      //     var notificationOpenedCallback = function(jsonData) {
      //       alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      //       console.log('notificationOpenedCallback');
      //     };

      //     window["plugins"].OneSignal
      //       .startInit("1ae97439-f217-446d-9ae5-8fefcfb36ed7", "509701155983")
      //       .handleNotificationOpened(notificationOpenedCallback)
      //       .endInit();
      //     this.statusBar.styleDefault();
      //     this.splashScreen.hide();
      //   }
      // }
    });
  }
}
