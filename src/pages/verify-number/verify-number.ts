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
  public inputData:any;
  public MobileNumber:any;
  public showOtpPoup:any = "false";
  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthenticateProvider) {
    this.inputData = this.navParams.get("inputData");  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyNumberPage');
  }

  GenerateOTP(){
	this.inputData.action ='SIGNUP';
    this.inputData.contactNumber = this.MobileNumber;
    this.authProvider.login(this.inputData).subscribe(success => {
    	if((success.status !== undefined)&&(success.status == '0009')) {
                this.showOtpPoup = "true";
            }else {
                alert(success.status);
            }
    });
  }

}
