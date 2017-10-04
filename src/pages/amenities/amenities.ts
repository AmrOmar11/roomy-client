import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AmenitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-amenities',
  templateUrl: 'amenities.html',
})
export class AmenitiesPage {
	public amenities:any = [{img:'assets/amenities/2_people.png',text:'Max 2 people'},
						{img:'assets/amenities/bed.png',text:'1 Queen bed'},
						{img:'assets/amenities/restaurant.png',text:'Restaurant'},
						{img:'assets/amenities/wifi.png',text:'Wifi'},
						{img:'assets/amenities/swimming.png',text:'Swimming Pool'},
						{img:'assets/amenities/glass.png',text:'Bar'},
						{img:'assets/amenities/TV.png',text:'Television'},
						{img:'assets/amenities/bath.png',text:'Shower'}						
					];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AmenitiesPage');
  }

}
