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
    starRatingByHotel:any;
    public hideCard:boolean = true;
    public hideSlide:boolean = false;
    constructor(
        public navCtrl: NavController,
        public authProvider: AuthenticateProvider,
        public events: Events,
        public zone: NgZone) {
        events.subscribe('hotels:list', (hotelsList) => {
          this.hotels = hotelsList;
          if(this.hotels.length == 0 ){
            this.hideCard = false;
            this.hideSlide = true;
          }else{
            this.hideCard = true;
            this.hideSlide = false;
            this.slides.slideTo(0);
            this.events.publish('hotel:slideChanged',0);
          }          
          this.zone.run(() => {
            //console.log('force refresh hotel silder');
          });
        });
        events.subscribe('hotel:marker',(index)=>{
          this.slides.slideTo(index);
        });
    }

    ionViewDidLoad() {
      //console.log('ionViewDidLoad PreviewPage');
    }

    slideChanged(){
      let currentIndex = this.slides.getActiveIndex();
      let previousIndex = this.slides.getPreviousIndex();
      //console.log('slideChanged:',previousIndex,currentIndex);
      let length = this.slides.length();
      if(currentIndex < length){
        this.events.publish('hotel:slideChanged',currentIndex);
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
