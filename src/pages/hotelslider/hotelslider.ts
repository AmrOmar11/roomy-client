import { Component, ViewChild  } from '@angular/core';
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
	slideOptions={
		"pager":true,
		"paginationType":"bullets",
		"direction":"horizontal", /*Swipe direction: 'horizontal'or vertical'.*/
		"spaceBetween":0
	};
	slides = {
        "data": [{
            "hotelname": "Hotel Avasa",
            "address1": "16s steurart",
            "address2": "132 line",
            "city": "ST",
            "state": "ASDF",
            "category": "Premium",
            "mincost": "50INR",
            "hourcost": "50INR",
            "img": "url(../../assets/img/Hotel4.jpg)",
            "lattitue": "17.447020",
            "longitude": "78.383683"
        }, {
            "hotelname": "Trident Hotel",
            "address1": "16s steurart1",
            "address2": "132 line1",
            "city": "ST1",
            "state": "ASDF1",
            "category": "Luxury",
            "mincost": "40INR",
            "hourcost": "40INR",
            "img": "url(../../assets/img/Hotel1.jpg)",
            "lattitue": "17.449918",
            "longitude": "78.378951"
        }, {
            "hotelname": "Novotel",
            "address1": "16s steurart2",
            "address2": "132 line2",
            "city": "ST2",
            "state": "ASDF2",
            "category": "Premium",
            "mincost": "50INR",
            "hourcost": "50INR",
            "img": "url(../../assets/img/Hotel2.jpg)",
            "lattitue": "17.472835",
            "longitude": "78.372799"
        }, {
            "hotelname": "Redfox",
            "address1": "16s steurart3",
            "address2": "132 line3",
            "city": "ST3",
            "state": "ASDF3",
            "category": "Luxury",
            "mincost": "50INR",
            "hourcost": "50INR",
            "img": "url(../../assets/img/Hotel3.jpg)",
            "lattitue": "17.443244",
            "longitude": "78.376690"
        }]
    };
    haveData:boolean = true;
    marker:any;
    private location:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public mapPage: MapPage) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HotelsliderPage');
    }

    slideChanged($event){
    	if(this.slides.data[$event._activeIndex] !== undefined){
            this.mapPage.displayDirection(this.slides.data[$event._activeIndex].lattitue,this.slides.data[$event._activeIndex].longitude);
        }    	
    }
}
