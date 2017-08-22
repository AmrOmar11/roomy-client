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
    
    @Input()hotels:any;
    @Input()geolocation:any;
    HotelDistance:any;
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
            this.mapPage.displayDirection(this.hotels[$event._activeIndex].lattitude,this.hotels[$event._activeIndex].longitude);
            this.getDistanceFromLatLonInKm(this.geolocation.lat(),this.geolocation.lng(),parseFloat(this.hotels[$event._activeIndex].latitude),parseFloat(this.hotels[$event._activeIndex].longitude));
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

    getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      console.log(lat1,lon1,lat2,lon2);
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
      var dLon = this.deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      if((d%1) > 0)
          this.HotelDistance = d.toFixed(2) + " KM away";
      else
          this.HotelDistance = d + " KM away";
    }

    deg2rad(deg) {
        return deg * (Math.PI/180)
    }
}
