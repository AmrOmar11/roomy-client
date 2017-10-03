import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  minDuration:any;
  stayDuration:any;
  stayDurationInput:any;
  fareAmount:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.hotelInfo = this.navParams.data;
  	if(this.hotelInfo.minmumDurationPin <10){
        this.stayDuration = "0"+this.hotelInfo.minmumDurationPin+":00";
    }else{
        this.stayDuration = this.hotelInfo.minmumDurationPin+":00";
    }
    this.minDuration = this.stayDuration;
    this.calculatefare();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DurationPage');
  }
	calculatefare(){
	    this.stayDurationInput = this.stayDuration;
	    this.stayDurationInput = this.stayDurationInput.toString();
	    this.stayDurationInput = this.stayDurationInput.split(":")
	    this.stayDurationInput = ((parseInt(this.stayDurationInput[0])*60)+ parseInt(this.stayDurationInput[1]));
	    //fareAmount = Hotelcharge + Tax;
	    this.fareAmount = ((this.stayDurationInput*(this.hotelInfo.pricePerMin)) + ((this.stayDurationInput*(this.hotelInfo.pricePerMin))*(parseFloat(this.hotelInfo.tax)/100))).toFixed(2);
	}
}
