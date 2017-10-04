import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HotelPloicyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel-ploicy',
  templateUrl: 'hotel-ploicy.html',
})
export class HotelPloicyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelPloicyPage');
  }

  openTnC(){
  	this.navCtrl.push('PoliciesPage');
  	//window.open('https://www.pobyt.co/','_system');
  }

}
