import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelPloicyPage');
  }

  openTnC(){
     this.events.publish('PoliciesPage:open',0);

  	//this.navCtrl.push('PoliciesPage');
  	//window.open('https://www.pobyt.co/','_system');
  }

}
