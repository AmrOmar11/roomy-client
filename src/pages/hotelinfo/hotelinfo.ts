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
  hours :any = ["00","01","02","03","04","05","06","07","08","09","10","11","12"];
  minutes :any = ["00","05","10","15","20","25","30","35","40","45","50","55"];
  hour :any = 1;
  min :any = 0;
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




  hourup() {
    var hourtxt ="hour0",oldhrtxt="hour0",nexthrtxt= "hour0",olderhrtxt="hour0";
    if (this.hour == 1) {
      null;
    }
    else {
      var nexthr = this.hour - 2;
      var newhr = this.hour - 1;
      var oldhr = this.hour;
      var olderhr = this.hour + 1;
      this.hour = this.hour - 1;
      if(this.hour >= 10){
        hourtxt = "hour";
      }
      if(oldhr >= 10){
        oldhrtxt = "hour";
      }
      if(nexthr >= 10){
        nexthrtxt = "hour";
      }
      if(olderhr >= 10){
        olderhrtxt = "hour";
      }
      console.log(hourtxt+newhr)
      document.getElementById(hourtxt + newhr).style.opacity = "1";
      document.getElementById(oldhrtxt + oldhr).style.opacity = "0.25";
      document.getElementById(nexthrtxt + nexthr).style.opacity = "0.25";
      document.getElementById(olderhrtxt + olderhr).style.opacity = "0";
      document.getElementById("hoursdiv").style.top = -43 * (this.hour - 1) + "px";
    }
  }

  hourdown() {
    var hourtxt = "hour0",oldhrtxt="hour0",nexthrtxt= "hour0",olderhrtxt="hour0";
    if (this.hour == 12) {
      null;
    }
    else {
      var nexthr = this.hour + 2;
      var newhr = this.hour + 1;
      var oldhr = this.hour;
      var olderhr = this.hour - 1;
      this.hour = this.hour + 1;
      if(this.hour >= 10){
        hourtxt = "hour";
      }
      if(oldhr >= 10){
        oldhrtxt = "hour";
      }
      if(nexthr >= 10){
        nexthrtxt = "hour";
      }
      if(olderhr >= 10){
        olderhrtxt = "hour";
      }
      console.log(hourtxt+newhr)
      document.getElementById(hourtxt + newhr).style.opacity = "1";
      document.getElementById(oldhrtxt + oldhr).style.opacity = "0.25";
      document.getElementById(nexthrtxt + nexthr).style.opacity = "0.25";
      document.getElementById(olderhrtxt + olderhr).style.opacity = "0";
      document.getElementById("hoursdiv").style.top = -43 * (this.hour - 1) + "px";
    }
  }

  minuteup() {
    var nextmin,newmin,oldmin,oldermin,mintxt="min0",oldmintxt="min0",oldermintxt="min0",nextmintxt="min0";
    if (this.min == 0) {
      null;
    }
    else {
      if (this.min == 5) {     
        nextmin = this.min - 10;
        newmin = this.min - 5;
        oldmin = this.min;
        oldermin = this.min + 5;
        this.min = this.min - 5;
        if(this.min >= 10){
          mintxt = "min";
      }
      if(oldmin >= 10){
          oldmintxt = "min";
        }
        if(nextmin >= 10){
          nextmintxt = "min";
        }
        if(oldermin >= 10){
          oldermintxt = "min";
        }

      console.log(oldermintxt+oldmintxt+mintxt+nextmintxt);
        document.getElementById(mintxt + newmin).style.opacity = "1";
        document.getElementById(oldmintxt + oldmin).style.opacity = "0.25";
        document.getElementById(nextmintxt + nextmin).style.opacity = "0.25";
        document.getElementById(oldermintxt + oldermin).style.opacity = "0";
        document.getElementById("minsdiv").style.top = -43 * (this.min / 5) + "px";
      }
      else {
        nextmin = this.min - 10;
        newmin = this.min - 5;
        oldmin = this.min;
        oldermin = this.min + 5;
        this.min = this.min - 5;
        if(this.min >= 10){
          mintxt = "min";
      }
        if(oldmin >= 10){
          oldmintxt = "min";
        }
        if(nextmin >= 10){
          nextmintxt = "min";
        }
        if(oldermin >= 10){
          oldermintxt = "min";
        }
      console.log(oldermintxt+oldmintxt+mintxt+nextmintxt);
        document.getElementById(mintxt + newmin).style.opacity = "1";
        document.getElementById(oldmintxt + oldmin).style.opacity = "0.25";
        document.getElementById(nextmintxt + nextmin).style.opacity = "0.25";
        document.getElementById(oldermintxt + oldermin).style.opacity = "0";
        document.getElementById("minsdiv").style.top = -43 * (this.min / 5) + "px";
        }
    }
  }

  minutedown() {
    var nextmin,newmin,oldmin,oldermin,mintxt="min0",oldmintxt="min0",oldermintxt="min0",nextmintxt="min0";
    if (this.min == 55) {
      null;
    }
    else {
      nextmin = this.min + 10;
      newmin = this.min + 5;
      oldmin = this.min;
      oldermin = this.min - 5;
      this.min = this.min + 5;
      if(this.min >= 10){
          mintxt = "min";
      }
        if(oldmin >= 10){
          oldmintxt = "min";
        }
        if(nextmin >= 10){
          nextmintxt = "min";
        }
        if(oldermin >= 10){
          oldermintxt = "min";
        }
      console.log(oldermintxt+oldermin+oldmintxt+oldmin+mintxt+this.min+nextmintxt+nextmin);
        document.getElementById(mintxt + newmin).style.opacity = "1";
        document.getElementById(oldmintxt + oldmin).style.opacity = "0.25";
        document.getElementById(nextmintxt + nextmin).style.opacity = "0.25";
        document.getElementById(oldermintxt + oldermin).style.opacity = "0";
      document.getElementById("minsdiv").style.top = -43 * (this.min / 5) + "px";
    }
  }
}
