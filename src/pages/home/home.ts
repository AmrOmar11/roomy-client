import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	userInfo:any;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.userInfo = this.navParams.get('userInfo');
	}

	// Load map only after view is initialized
	ionViewDidLoad() {
	}
	
	goToPayment(){
    	this.navCtrl.push('PaymentPage');
	}
	goToPromotions(){
		this.navCtrl.push('PromotionsPage');
	}
	goToSettings(){
		this.navCtrl.push('SettingsPage',{userInfo:this.userInfo});
	}
	goToHowItWorks(){
		this.navCtrl.push('HowitworksPage');
	}
	goToInviteFriends(){
		this.navCtrl.push('InvitePage');
	}
}
