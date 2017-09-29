import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BookingHistoryDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-history-details',
  templateUrl: 'booking-history-details.html',
})
export class BookingHistoryDetailsPage {
public booking:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.booking = this.navParams.get("bookingInfo");
  	this.booking.stayDuration = "4 Hours";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingHistoryDetailsPage');
  }

  SendInvoice(){
  	alert('Invoice will be sent to your email shortly.');
  }
  OpenBookingPage(){
  	this.navCtrl.popToRoot();
  }
}
