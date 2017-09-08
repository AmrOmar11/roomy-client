import { Component, ViewChild} from '@angular/core';
import { NavController, Slides} from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Events } from 'ionic-angular';
import { NgZone  } from '@angular/core';
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
    @ViewChild(Slides) slides: Slides;
    hotels:any;
    geolocation:any;
    HotelDistance:any;
    public hideCard:any = 'true';
    constructor(
        public navCtrl: NavController,
        public authProvider: AuthenticateProvider,
        public events: Events,
        public zone: NgZone) {
        events.subscribe('hotels:list', (hotelsList, location) => {
          this.hotels = hotelsList;
          this.geolocation = location;
          if(this.hotels.length == 0 ){
            this.hideCard = 'false';
          }
          this.zone.run(() => {
            console.log('force refresh hotel silder');
          });
        });
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad PreviewPage');
      this.slides.flip = {
        slideShadows: false,
        limitRotation: false
      };
      // this.slides.grabCursor = true;
      // this.slides.nextButton = '.swiper-button-next';
      // this.slides.nextButton = '.swiper-button-prev';
    }

    slideChanged($event){
        if(this.hotels[$event._activeIndex] !== undefined){
            this.getDistanceFromLatLonInKm(this.geolocation.lat(),this.geolocation.lng(),parseFloat(this.hotels[$event._activeIndex].latitude),parseFloat(this.hotels[$event._activeIndex].longitude));
            this.events.publish('hotel:slideChanged',$event._activeIndex,$event._previousIndex);
        }
    }

    hotelDetailedInfo(hotelInfo){
      let inputData = {
        hotelId:hotelInfo.hotelId,
        customerToken : this.authProvider.getUserInfo().customerToken
      };
      this.authProvider.getHotelDetails(inputData).subscribe(data => {
          this.navCtrl.push('HotelinfoPage',{"hotelInfo":data.result} );
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
