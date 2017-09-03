import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { AuthenticateProvider, UserRequest } from '../../providers/authenticate/authenticate';
import { InvitePage } from '../invite/invite';
import { FacebookLoginService,GoogleLoginService } from '../../providers/providers';
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
    public navCtrl: NavController, 
    public authProvider: AuthenticateProvider,
    public modalCtrl: ModalController,
    public facebookLoginService: FacebookLoginService,
    public googleLoginService: GoogleLoginService) {
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
        let inputData:UserRequest = new UserRequest();
        inputData.action = 'LOGOUT';
        inputData.loginType = 'APP';
        inputData.customerToken = this.authProvider.getUserInfo().customerToken;
        inputData.userId = this.authProvider.getUserInfo().userID;
        this.authProvider.logout(inputData).subscribe(success => {
          if((success.statusCode !== undefined)&&(success.statusCode == 0)) {
              this.authProvider.removeUser();
              this.facebookLoginService.doFacebookLogout();
              this.googleLoginService.doGoogleLogout();
              this.navCtrl.setRoot('PreviewPage');
          }
        },
        error => {
           
        });
    }
}
