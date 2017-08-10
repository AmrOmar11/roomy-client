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
bookingFor="";
userInfo:any;


constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            private authProvider: AuthenticateProvider) {
    this.bookingFor = this.navParams.get("for");
    if(this.bookingFor!=="other"){
        this.userInfo = this.authProvider.getUserInfo();
    }
    else
    {
        this.userInfo={}
    }
}

ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
};
openTerms() {
    this.navCtrl.push('PoliciesPage');
}

}