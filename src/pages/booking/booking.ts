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
  	private auth: AuthenticateProvider) {
  	this.userInfo = this.auth.getUserInfo();
	if(this.userInfo == undefined){
		this.userInfo = {};
		this.userInfo.emailAddress='muralidharn.dharan9@gmail.com';
	    this.userInfo.contactNumber='9700222949';
	    this.userInfo.firstName='Murali';
	    this.userInfo.lastName='Kanamarlapudi';
	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

}
