import { Component,Input} from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { MapPage } from '../../pages/pages';
import { HotelsProvider } from '../../providers/hotels/hotels';

/**
 * Generated class for the HotelsliderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-hotelslider',
  templateUrl: 'hotelslider.html',
})
export class HotelsliderPage {
    
	@Input()hotels:any
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public mapPage: MapPage,
        public hotelsProvider: HotelsProvider,
        public loadingController:LoadingController) {
        console.log('constructor HotelsliderPage');
    }

    slideChanged($event){
        if(this.hotels[$event._activeIndex] !== undefined){
            this.mapPage.displayDirection(this.hotels[$event._activeIndex].lattitue,this.hotels[$event._activeIndex].longitude);
        }
    }

    hotelDetailedInfo(hotelInfo){
        let loader = this.loadingController.create({
            content:"Fetching Hotels..."
        });
        loader.present().then(()=>{
            this.hotelsProvider.getHotelDetailedInfo().then(data => {
                  loader.dismiss();
                  this.navCtrl.push('HotelinfoPage',{"hotelInfo":data});
            });
        });
    }
}
