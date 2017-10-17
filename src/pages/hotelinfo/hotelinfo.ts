import { Component } from '@angular/core';
import { IonicPage,NavParams,NavController,AlertController, Events } from 'ionic-angular';
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
    minDuration:any;
    stayDuration:any;
    stayDurationInput:any;
    fareAmount:any;
    hotelInfo:any;
    userInfo:any;
    hour :any = 1;
    min :any = 0;
    page1: any = 'DurationPage';
    page2: any = 'AmenitiesPage';
    page3: any = 'HotelPloicyPage';

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private authProvider: AuthenticateProvider, public events: Events) {
      this.hotelInfo = this.navParams.get("hotelInfo");
      if(this.hotelInfo.minmumDurationPin <10){
          this.stayDuration = "0"+this.hotelInfo.minmumDurationPin+":00";
      }else{
          this.stayDuration = this.hotelInfo.minmumDurationPin+":00";
      }
      this.minDuration = this.stayDuration;
      this.userInfo = this.authProvider.getUserInfo();
      this.calculatefare();
      events.subscribe('PoliciesPage:open', () => {
        this.navCtrl.push('PoliciesPage');
      });
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
      this.hotelInfo.stayDuration=this.stayDuration.split(":");
      this.hotelInfo.stayDurationHrs = this.hotelInfo.stayDuration[0]
      this.hotelInfo.stayDurationMin = this.hotelInfo.stayDuration[1]
      this.hotelInfo.planned= {hour:this.hour,min:this.min, stayDuration: this.stayDuration, fareAmount: this.fareAmount}
    let confirm = this.alertCtrl.create({
        message: 'Booking For '+this.userInfo.firstName+" ?",
        buttons: [
            {
                text: 'Other',
                handler: () => {
                  //console.log(this.authProvider);
                  this.navCtrl.push('BookingPage',{for:"other",
                      hotelInfo:this.hotelInfo
                    }
                  );
                }
            },
            {
                text: 'Yes',
                handler: () => {
                  this.navCtrl.push('BookingPage',{for:"me",
                      hotelInfo:this.hotelInfo
                    }
                  );
                }
            }
        ]
    });
    confirm.present();
  }
  
}
