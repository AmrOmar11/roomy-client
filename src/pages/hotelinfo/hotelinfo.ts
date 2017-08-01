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

	stayDuration:any = 60;
  stayDurationInHours:any = 1;
	fareAmount:any;
  hotelInfo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.hotelInfo = this.navParams.get("hotelInfo");  
    this.calculatefare();
  }

  calculatefare(){
    this.stayDurationInHours  = (this.stayDuration/60).toFixed(2);
    this.stayDurationInHours = this.stayDurationInHours.toString().replace(".",":");
    //fareAmount = Hotelcharge + Tax;
  	this.fareAmount = ((this.stayDuration*(this.hotelInfo.chargepermin)) + ((this.stayDuration*(this.hotelInfo.chargepermin))*(this.hotelInfo.taxpercent/100))).toFixed(2);
  }

  dismiss(){
    this.navCtrl.pop();
  }
    
  reserveNow(){
    this.navCtrl.push('BookingPage');
  }
}
