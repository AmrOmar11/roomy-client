import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';

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
  public inputData:any={};
  public MobileNumber:any;
  public showOtpPoup:any = "true";
  public HiddenMobNum:any = '';
  public OTPresponse:any={};
  items = ['','','','','',''];
  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthenticateProvider) {
    this.inputData = this.navParams.get("inputData");  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyNumberPage');
    //Test Data.
    // this.HideMobCharacter('9711223344');
    // this.OTPresponse.jwtToken = "1234567890";
    // this.OTPresponse.result = {};
    // this.OTPresponse.result.userId = "1234567";
  }

  GenerateOTP(){
	this.inputData.action ='SIGNUP';
    this.inputData.contactNumber = this.MobileNumber;
    this.authProvider.login(this.inputData).subscribe(success => {
    	if((success.status !== undefined)&&(success.status == '0009')) {
                this.showOtpPoup = "true";
                this.OTPresponse = success;
                this.HideMobCharacter(this.MobileNumber);
            }else {
                alert(success.status);
            }
    });
  }

  SubmitOTP(){
  	this.inputData = {};
  	var OTP='';
  	for(var item in this.items){
  		OTP = OTP + this.items[item];
  	}
  	this.inputData.action ='OTP';
    this.inputData.otp = parseInt(OTP);
    this.inputData.token = this.OTPresponse.jwtToken;
    this.inputData.userId = this.OTPresponse.result.userId;
    this.authProvider.login(this.inputData).subscribe(success => {
    	if((success.status !== undefined)&&(success.status == '0001')) {
            this.authProvider.setCurrentUser(success);
            this.authProvider.setUserData(success);
            this.navCtrl.setRoot('HomePage');
        }else{
        	alert(success.status);
        }
    });
  }


  next(el) {
    el.setFocus();
  }
  HideMobCharacter(MobileNumber){
  	var i;
  	MobileNumber = MobileNumber.split('');
  	for(i=0; i<10;i++){
	    for(i=0; i<10;i++){
		    if(i==0||i==8||i==9)
				this.HiddenMobNum= this.HiddenMobNum+MobileNumber[i];
			else
				this.HiddenMobNum= this.HiddenMobNum+'x';
		}
	}
  }
}
