import { Component,Input, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides  } from 'ionic-angular';
import { MapPage } from '../../pages/pages';

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
	@ViewChild(Slides) slidesObj: Slides;
    
    @Input()hotels:any
    constructor(public navCtrl: NavController, public navParams: NavParams,public mapPage: MapPage) {
        console.log('constructor HotelsliderPage');
    }

    slideChanged($event){
        if(this.hotels[$event._activeIndex] !== undefined){
            this.mapPage.displayDirection(this.hotels[$event._activeIndex].lattitue,this.hotels[$event._activeIndex].longitude);
        }
    }
}
