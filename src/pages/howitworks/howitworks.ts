import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HowitworksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-howitworks',
  templateUrl: 'howitworks.html'
})
export class HowitworksPage {
	slides =[
	     {
	        "image":"https://www.gstatic.com/webp/gallery3/1.png"
	     },
	     {
	        "image":"https://www.gstatic.com/webp/gallery3/2.png"
	     },
	     {
	     	"image":"https://www.gstatic.com/webp/gallery3/3.png"
	     },
	     {
	     	"image":"https://www.gstatic.com/webp/gallery3/4.png"
	     },
	     {
	     	"image":"https://www.gstatic.com/webp/gallery3/5.png"
	     }
     ];

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad HowitworksPage');
	}

}
