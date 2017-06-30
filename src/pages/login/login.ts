import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FacebookLoginService,GoogleLoginService } from '../../providers/providers';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loading:any;
  constructor(public nav: NavController, public navParams: NavParams,
  				public loadingCtrl:LoadingController,
				public facebookLoginService: FacebookLoginService,
    			public googleLoginService: GoogleLoginService,) {
  }

  doFacebookLogin() {
    this.loading = this.loadingCtrl.create();

    // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
    let env = this;

    this.facebookLoginService.getFacebookUser()
    .then(function(data) {
       // user is previously logged with FB and we have his data we will let him access the app
      env.nav.popToRoot();
    }, function(error){
      //we don't have the user data so we will ask him to log in
      env.facebookLoginService.doFacebookLogin()
      .then(function(res){
        env.loading.dismiss();
        env.nav.popToRoot();
      }, function(err){
        console.log("Facebook Login error", err);
      });
    });
  }

  doGoogleLogin() {
    this.loading = this.loadingCtrl.create();

    // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
    let env = this;

    this.googleLoginService.trySilentLogin()
    .then(function(data) {
       // user is previously logged with Google and we have his data we will let him access the app
      env.nav.popToRoot();
    }, function(error){
      //we don't have the user data so we will ask him to log in
      env.googleLoginService.doGoogleLogin()
      .then(function(res){
        env.loading.dismiss();
        env.nav.popToRoot();
      }, function(err){
        console.log("Google Login error", err);
      });
    });
  }

}
