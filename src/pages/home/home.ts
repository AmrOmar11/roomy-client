import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';

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
	constructor(
		private loadingCtrl: LoadingController,
		public navCtrl: NavController, 
		public navParams: NavParams,
		private authProvider: AuthenticateProvider) {
  		this.userInfo = this.authProvider.getUserInfo();
	}
	
	ionViewDidLoad() {
	}
	
	goToPayment(){
    	this.navCtrl.push('PaymentPage');
	}
	goToPromotions(){
		this.navCtrl.push('PromotionsPage');
	}
	goToSettings(){
		this.navCtrl.push('SettingsPage');
	}
	goToHowItWorks(){
		this.navCtrl.push('HowitworksPage');
	}
	goToInviteFriends(){
		this.navCtrl.push('InvitePage');
	}
	contactUs(){

	}
	logOut(){
	    let loader = this.loadingCtrl.create({
	      content: 'Please wait...',
	      dismissOnPageChange: true
	    });
	    loader.present();
		this.navCtrl.setRoot('WelcomePage');
	}
}
