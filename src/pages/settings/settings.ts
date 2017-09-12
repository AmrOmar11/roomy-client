import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticateProvider, UserRequest } from '../../providers/authenticate/authenticate';
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  userInfo:any;
  profileForm:FormGroup;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public formBuilder: FormBuilder,
   private loadingCtrl: LoadingController,
   private authProvider: AuthenticateProvider) {
    this.userInfo = this.authProvider.getUserInfo();
  	// this.profileForm = this.formBuilder.group({
	  //     firstname: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
   //      lastname: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
   //      mobile: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.required]),''],
	  //     email: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.required]),''],
	  // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  updateProfile(){

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
          this.navCtrl.setRoot('PreviewPage');
      }
    },
    error => {
       
    });
  }  
}
