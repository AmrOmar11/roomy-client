import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HotelinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hotelinfo',
  templateUrl: 'hotelinfo.html',
})
export class HotelinfoPage {

  hotelInfo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.hotelInfo = this.navParams.get("hotelInfo");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelinfoPage');

  }

}
