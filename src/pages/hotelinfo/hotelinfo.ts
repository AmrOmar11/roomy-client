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
    hotelInfo:any;
    userInfo:any;
    page1: any = 'DurationPage';
    page2: any = 'AmenitiesPage';
    page3: any = 'HotelPloicyPage';

    constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private authProvider: AuthenticateProvider, public events: Events) {
        this.hotelInfo = this.navParams.get("hotelInfo");
        this.userInfo = this.authProvider.getUserInfo();
        events.subscribe('PoliciesPage:open', () => {
          this.navCtrl.push('PoliciesPage');
        });
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
