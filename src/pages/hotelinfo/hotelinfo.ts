import { Component } from '@angular/core';
import { IonicPage,NavParams,NavController,AlertController } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';

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

  stayDuration:any = "01:00";
  stayDurationInput:any;
  fareAmount:any;
  hotelInfo:any;
  userInfo:any;
  hour :any = 1;
  min :any = 0;
constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private authProvider: AuthenticateProvider) {
    this.hotelInfo = this.navParams.get("hotelInfo");  
    this.userInfo = this.authProvider.getUserInfo();
    this.calculatefare();
}

calculatefare(){
    this.stayDurationInput = this.stayDuration;
    this.stayDurationInput = this.stayDurationInput.toString();
    this.stayDurationInput = this.stayDurationInput.split(":")
    this.stayDurationInput = ((parseInt(this.stayDurationInput[0])*60)+ parseInt(this.stayDurationInput[1]));
    //fareAmount = Hotelcharge + Tax;
    this.fareAmount = ((this.stayDurationInput*(this.hotelInfo.pricePerMin)) + ((this.stayDurationInput*(this.hotelInfo.pricePerMin))*(parseFloat(this.hotelInfo.tax)/100))).toFixed(2);
}

dismiss(){
    this.navCtrl.pop();
}

reserveNow(){
    let confirm = this.alertCtrl.create({
        message: 'Booking For '+this.userInfo.first_Name+" ?",
        buttons: [
            {
                text: 'Other',
                handler: () => {
                    console.log(this.authProvider);
                    this.navCtrl.push('BookingPage',{for:"other"});
                }
            },
            {
                text: 'Yes',
                handler: () => {
                    this.navCtrl.push('BookingPage',{for:"me"});
                }
            }
        ]
    });
    confirm.present();
}

}
