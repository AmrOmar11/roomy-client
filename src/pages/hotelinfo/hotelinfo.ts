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

    stayDuration:any = 60;
stayDurationInHours:any = 1;
fareAmount:any;
hotelInfo:any;
userInfo:any;
constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private authProvider: AuthenticateProvider) {
    this.hotelInfo = this.navParams.get("hotelInfo");  
    this.userInfo = this.authProvider.getUserInfo();
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

    let confirm = this.alertCtrl.create({
        message: 'Booking For '+this.userInfo.firstName+" ?",
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
