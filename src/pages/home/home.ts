import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Push, PushToken } from '@ionic/cloud-angular';

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
		public loadingCtrl: LoadingController,
		public navCtrl: NavController, 
		public navParams: NavParams,
		public authProvider: AuthenticateProvider,
		public push: Push) {
  		this.userInfo = this.authProvider.getUserInfo();
  		this.push.register().then((t: PushToken) => {
		  return this.push.saveToken(t);
		}).then((t: PushToken) => {
		  console.log('Token saved:', t.token);
		});
		this.push.rx.notification()
		.subscribe((msg) => {
			console.log(msg.title + ': ' + msg.text);
			this.navCtrl.push('NotificationsPage', { message: msg });
		});
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
		this.navCtrl.setRoot('LoginPage');
	}
}
