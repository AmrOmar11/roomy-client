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
    guests="one";
userInfo:any;
editGuest=false;

constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            private authProvider: AuthenticateProvider) {
    this.userInfo = this.authProvider.getUserInfo();
}

ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
};
openTerms() {
   this.navCtrl.push('PoliciesPage');
}
onBookTo(){
    this.editGuest = !this.editGuest;
}
onSaveBookingTo(){
    this.editGuest = !this.editGuest;
}

}
