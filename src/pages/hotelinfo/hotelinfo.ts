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
  minDuration:any;
  stayDuration:any;
  stayDurationInput:any;
  fareAmount:any;
  hotelInfo:any;
  userInfo:any;
  hour :any = 1;
  min :any = 0;
constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private authProvider: AuthenticateProvider) {
    this.hotelInfo = this.navParams.get("hotelInfo");
    if(this.hotelInfo.minmumDurationPin <10){
        this.stayDuration = "0"+this.hotelInfo.minmumDurationPin+":00";
    }else{
        this.stayDuration = this.hotelInfo.minmumDurationPin+":00";
    }
    this.minDuration = this.stayDuration;
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
                    //console.log(this.authProvider);
                    this.navCtrl.push('BookingPage',{for:"other",
                          hotelInfo:{
                            hotelName:this.hotelInfo.hotelName,
                            stayDuration:this.stayDuration
                          }
                        }
                      );
                }
            },
            {
                text: 'Yes',
                handler: () => {
                    this.navCtrl.push('BookingPage',{for:"me",
                          hotelInfo:{
                            hotelName:this.hotelInfo.hotelName,
                            stayDuration:this.stayDuration
                          }
                        }
                      );
                }
            }
        ]
    });
    confirm.present();
}

    getRating(rating){
      let ratingString = '';
      rating = parseInt(rating);
      if(rating == undefined || rating <= 3)
      {
        ratingString = "three";
      }else if(rating == 5)
      {
        ratingString = "five";
      }else if(rating == 7)
      {
        ratingString = "seven";
      }
      return ratingString;
    }
}
