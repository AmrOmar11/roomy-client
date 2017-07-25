import { Component,Input, ViewChild  } from '@angular/core';
import { NavController, NavParams, Slides, LoadingController} from 'ionic-angular';
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
    options:any;
	@ViewChild(Slides) slidesObj: Slides;
    
    @Input()hotels:any
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public mapPage: MapPage,
        public hotelsProvider: HotelsProvider,
        public loadingController:LoadingController) {
        this.options ={
            direction: 'vertical',
            slidesPerView: '1',
            paginationClickable: true,
            showNavButtons: false
        }
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
                  this.navCtrl.push('HotelinfoPage',{"hotelInfo":data} );                  
            });
        });
    }
}
