import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
	slideOptions={
		"pager":true,
		"paginationType":"bullet",
		"direction":"horizontal" /*Swipe direction: 'horizontal'or vertical'.*/
	};
	slides = {
    "data": [{
        "hotelname": "Harbor Court",
        "address1": "16s steurart",
        "address2": "132 line",
        "city": "ST",
        "state": "ASDF",
        "category": "Premium",
        "mincost": "50INR",
        "hourcost": "50INR",
        "img": "../../assets/img/Hotel4.jpg",
        "lattitue": "17.3850° N",
        "longitude": "78.4867° E"
    }, {
        "hotelname": "Harbor Court1",
        "address1": "16s steurart1",
        "address2": "132 line1",
        "city": "ST1",
        "state": "ASDF1",
        "category": "Luxury",
        "mincost": "40INR",
        "hourcost": "40INR",
        "img": "../../assets/img/Hotel1.jpg",
        "lattitue": "17.3850° N",
        "longitude": "78.4867° E"
    }, {
        "hotelname": "Harbor Court2",
        "address1": "16s steurart2",
        "address2": "132 line2",
        "city": "ST2",
        "state": "ASDF2",
        "category": "Premium",
        "mincost": "50INR",
        "hourcost": "50INR",
        "img": "../../assets/img/Hotel2.jpg",
        "lattitue": "17.3850° N",
        "longitude": "78.4867° E"
    }, {
        "hotelname": "Harbor Court3",
        "address1": "16s steurart3",
        "address2": "132 line3",
        "city": "ST3",
        "state": "ASDF3",
        "category": "Luxury",
        "mincost": "50INR",
        "hourcost": "50INR",
        "img": "../../assets/img/Hotel3.jpg",
        "lattitue": "17.3850° N",
        "longitude": "78.4867° E"
    }]
}
;
    haveData:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelsliderPage');
  }

}
