import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,Loading } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  loading:Loading;
  signUpSuccess = false;
  signUpForm:FormGroup;
  signUpAttempt:boolean=false;
  signUpData = {
    contactNumber: "",
    emailAddress: "",
    firstName: "",
    lastName: "",
    loginPassword: "",
    middleName: ""
  };
 
  constructor(
    private nav: NavController, 
    public navParams: NavParams, 
    private auth: AuthenticateProvider, 
    private alertCtrl: AlertController, 
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController) {
      this.signUpForm = this.formBuilder.group({
        firstname: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
        lastname: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
        mobile: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.required]),''],
        email: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.required]),''],
        password: ['',Validators.compose([Validators.required]),'']
      });    
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  singUpSubmit() {
    this.signUpAttempt = true;
    if(this.signUpForm.valid){
      this.showLoading();
      console.log('singUpSubmit:req:'+this.signUpData);
      this.auth.registerUser(this.signUpData).subscribe(success => {
        if((success.statusCode !== undefined)&&(success.statusCode == 0)) {
          this.showOtpPoup(success);
        } else {
          this.showPopup("Error", success.statusMessage);
        }
      },
      error => {
        this.showPopup("Error", error);
      });
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  
  showOtpPoup(inputData){
    if(this.loading !== undefined){
      this.loading.dismiss();
    }
    let alert = this.alertCtrl.create({
      message: 'Please enter OTP:'+inputData.otp+' sent to your Mobile Number:'+inputData.contactNumber,
      inputs: [
        {
          name: 'OTP',
          placeholder: 'OTP'
        },
      ],
      buttons: [
        {
          text: 'ReSend OTP?',
          handler: data => {
            console.log('ReSend clicked');
          }
        },
        {
          text: 'Done',
          handler: data => {
            this.showLoading();
            inputData.otp = data;
            this.authenticateUser(inputData);
          }
        }
      ]
    });
    alert.present();
  }

  authenticateUser(inputData){
    this.auth.authenticateUser(inputData).subscribe(success => {
    if((success.statusCode !== undefined)&&(success.statusCode == 0)) {
      this.auth.setCurrentUser({
        statusMessage:success.statusMessage,
        result:inputData,
        jwtToken:success.jwtToken
      });
      this.nav.setRoot('HomePage',{userInfo:this.auth.getUserInfo()});
    } else {
        this.showPopup("Error", success.statusMessage);
      }
    },
    error => {
      this.showPopup("Error", error);
    });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.signUpSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
