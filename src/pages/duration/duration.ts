import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InlinePicker} from './inlinepicker';

/**
 * Generated class for the DurationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-duration',
  templateUrl: 'duration.html',
})
export class DurationPage {
  hotelInfo:any;
  cost:any;
  youPay:any;
  stayDuration:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.hotelInfo = this.navParams.data;
    this.calculatefare({'hours':this.hotelInfo.minmumDurationPin,'mins':'00'});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DurationPage');
  }

	calculatefare(duration){
    this.stayDuration = duration;
    this.cost = this.hotelInfo.pricePerMin*this.stayDuration.hours*60;
    if(this.stayDuration.mins !== '00'){
      this.cost = this.cost+(this.hotelInfo.pricePerMin*this.stayDuration.mins);
    }
    this.youPay = parseFloat(this.cost+((this.cost*this.hotelInfo.tax)/100)).toFixed(2);
	}
}
