import { Component} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//declare var FCMPlugin;
@Component({
  templateUrl: 'app.html'
})
export class RoomyApp {
  
  rootPage: any = 'WelcomePage';

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     /* FCMPlugin.getToken(
        (t) => {
          console.log(t);
        },
        (e) => {
          console.log(e);
        }
      );

      FCMPlugin.onNotification(
        (data) => {
          console.log(data);
        },
        (e) => {
          console.log(e);
        }
      );*/
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
