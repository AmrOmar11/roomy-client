import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticateProvider, UserRequest } from '../../providers/authenticate/authenticate';

/**
 * Generated class for the VerifyNumberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-verify-number',
  templateUrl: 'verify-number.html',
})
export class VerifyNumberPage {
  public inputData:UserRequest;
  public hideMobilePopUp:boolean = true;
  public hideOtpPopUp:boolean = true;
  public HiddenMobNum:any = '';
  public items = ['','','','','',''];

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthenticateProvider) {
    this.inputData = this.navParams.get("inputData");
    let screen = this.navParams.get("screen");
    if(screen == 'mobile'){
      this.hideMobilePopUp = false;
    }else if(screen == 'otp'){
      this.hideOtpPopUp = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyNumberPage');
  }

  public generateOtp(){
    this.authProvider.login(this.inputData).subscribe(success => {
    	if((success.status !== undefined)&&(success.status == '0009')) {
          this.hideMobilePopUp = true;
          this.hideOtpPopUp = false;
          this.inputData.action ='OTP';
          this.inputData.customerToken = success.jwtToken;
          this.inputData.userId = success.result.userId;
          this.hideMobCharacter(this.inputData.contactNumber);
        }else {
            this.authProvider.showError(success.status);
        }
    },
    error => {
        this.authProvider.showError(error);
    });
  }

  public submitOtp(){
  	var OTP='';
  	for(var item in this.items){
  		OTP = OTP + this.items[item];
  	}
  	this.inputData.otp = parseInt(OTP);
    this.authProvider.login(this.inputData).subscribe(success => {
    	if((success.status !== undefined)&&(success.status == '0001')) {
            this.authProvider.setCurrentUser(success);
            this.authProvider.setUserData(success);
            this.navCtrl.setRoot('HomePage');
        }else {
            this.authProvider.showError(success.status);
        }
    },
    error => {
        this.authProvider.showError(error);
    });
  }


  next(el) {
    el.setFocus();
  }

  hideMobCharacter(MobileNumber){
  	var i;
  	MobileNumber = MobileNumber.split('');
  	for(i=0; i<MobileNumber.length;i++){
	    for(i=0; i<10;i++){
		    if(i==0||i==(MobileNumber.length-2)||i==(MobileNumber.length-1)){
	          this.HiddenMobNum= this.HiddenMobNum+MobileNumber[i];
	        }else{
	          this.HiddenMobNum= this.HiddenMobNum+'x';
	        }
		  }
	  }
  }
}
