import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BookingConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-booking-confirm',
  templateUrl: 'booking-confirm.html',
})
export class BookingConfirmPage {
  public userInfo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.userInfo = this.navParams.get("userInfo"); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingConfirmPage');
  }

}
