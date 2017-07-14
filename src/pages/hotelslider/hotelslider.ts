import { Component,Input, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,Slides,  LoadingController  } from 'ionic-angular';
import { MapPage } from '../../pages/pages';
import { HotelsProvider } from '../../providers/hotels/hotels';

/**
 * Generated class for the HotelsliderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotelslider',
  templateUrl: 'hotelslider.html',
})
export class HotelsliderPage {
    public detailedHotelInfo:any;
	@ViewChild(Slides) slidesObj: Slides;
    
    @Input()hotels:any
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public mapPage: MapPage,
        public hotelsProvider: HotelsProvider,
        public loadingController:LoadingController,
        public modalController: ModalController) {
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
                  this.detailedHotelInfo = data;
                  let modal = this.modalController.create('HotelinfoPage',{"hotelInfo":this.detailedHotelInfo} );
                  loader.dismiss();
                  modal.present();
            });
        });
    }
}
