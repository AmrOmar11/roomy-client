import { Component } from '@angular/core';
import { IonicPage,NavParams,NavController } from 'ionic-angular';

/**
 * Generated class for the HotelinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hotelinfo',
  templateUrl: 'hotelinfo.html',
})
export class HotelinfoPage {

	stayDuration= 1;
	fareAmount:any;
  hotelInfo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.hotelInfo = this.navParams.get("hotelInfo");  
  	this.fareAmount = (this.stayDuration*60*10) + ((this.stayDuration*60*10)*.18);	
  }

  calculatefare(){
  	this.fareAmount = (this.stayDuration*60*10) + ((this.stayDuration*60*10)*.18);
  }
  
  reserveNow(){
    this.navCtrl.push('BookingPage');
  }
}
