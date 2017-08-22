import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,LoadingController } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { InvitePage } from '../invite/invite';
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
     public modalCtrl: ModalController,
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
    let modal = this.modalCtrl.create(InvitePage);
    modal.present();
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
