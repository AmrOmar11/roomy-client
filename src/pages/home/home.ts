import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController,LoadingController } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { InvitePage } from '../invite/invite';

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
    public authProvider: AuthenticateProvider,
    public modalCtrl: ModalController) {
        this.userInfo = this.authProvider.getUserInfo();
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
        var inputData = {
          token: this.authProvider.getUserInfo().customerToken,
          userId: this.authProvider.getUserInfo().userID
        };
        this.authProvider.singOut(inputData).subscribe(success => {
          if((success.statusCode !== undefined)&&(success.statusCode == 0)) {
              this.authProvider.setUserData(success);
              this.navCtrl.setRoot('PreviewPage');
          } else {
              loader.dismiss();
          }
        },
        error => {
           loader.dismiss();
        });
    }
}
