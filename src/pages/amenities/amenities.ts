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
	public amenities:any = [{img:'assets/amenities/2_people.svg',text:'Max 2 people'},
						{img:'assets/amenities/bed.svg',text:'1 Queen bed'},
						{img:'assets/amenities/restaurant.svg',text:'Restaurant'},
						{img:'assets/amenities/wifi.svg',text:'Wifi'},
						{img:'assets/amenities/swimming.svg',text:'Swimming Pool'},
						{img:'assets/amenities/bar.svg',text:'Bar'},
						{img:'assets/amenities/TV.svg',text:'Television'},
						{img:'assets/amenities/shower.svg',text:'Shower'}						
					];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AmenitiesPage');
  }

}
