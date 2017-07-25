import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
/**
 * Generated class for the BookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-booking',
    templateUrl: 'booking.html',
})
export class BookingPage {
    userInfo:any;
constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            private authProvider: AuthenticateProvider) {
    this.userInfo = this.authProvider.getUserInfo();
}

ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
};
openTerms() {
    console.log('openTerms page');
}
goToSettings(){
    this.navCtrl.push('SettingsPage');
}

}
