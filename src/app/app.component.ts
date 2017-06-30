import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage, HowitworksPage, InvitePage, PaymentPage, PromotionsPage, SettingsPage,LoginPage} from '../pages/pages';

@Component({
  templateUrl: 'app.html'
})
export class RoomyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goToPayment(){
    this.nav.push(PaymentPage);
  }
  goToPromotions(){
    this.nav.push(PromotionsPage);
  }
  goToSettings(){
    this.nav.push(SettingsPage);
  }
  goToHowItWorks(){
    this.nav.push(HowitworksPage);
  }
  goToInviteFriends(){
    this.nav.push(InvitePage);
  }
  goToLogin(){
    this.nav.push(LoginPage)
  }
}
