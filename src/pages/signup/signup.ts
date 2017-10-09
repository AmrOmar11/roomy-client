import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	@ViewChild(Slides) slides: Slides;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}

	goClicked(){
	    this.slides.lockSwipeToNext(false);
	    this.slides.slideNext();
	    this.slides.lockSwipeToNext(true);
	}
}
