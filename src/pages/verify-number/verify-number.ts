import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { PasswordValidator } from  '../../validators/password';
import { AuthenticateProvider, UserRequest } from '../../providers/authenticate/authenticate';
import { Http, Response } from '@angular/http';

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
  private inputData:UserRequest;
  private hideMobilePopUp:boolean = true;
  private hideOtpPopUp:boolean = true;
  private hideResetForm:boolean = true;
  private hideOldPassword:boolean = true;
  private HiddenMobNum:any = '';
  private items = ['','','','','',''];
  public countryList;
  public countryCodeSelected = "+91";
  public listToggle= false;
  private imageName:string;
  private screenTitle:string;
  private resetForm: FormGroup;
  private oldPassword: AbstractControl;
  private password: AbstractControl;
  private re_password: AbstractControl;
  public countryselected:any = "";
    
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder,
    private authProvider: AuthenticateProvider,
	  private http:Http) {
    this.resetForm = formBuilder.group({
        'oldPassword': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
        'password': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
        're_password': ['', [Validators.required]]
        }, { 'validator': PasswordValidator.isMatching }
    );
    this.oldPassword = this.resetForm.controls['oldPassword'];
    this.password = this.resetForm.controls['password'];
    this.re_password = this.resetForm.controls['re_password'];
    this.inputData = this.navParams.get("inputData");
    let screen = this.navParams.get("screen");
    this.getCountries().then((data)=>{
      this.countryList = data;
      if(screen == 'mobile'){
        this.screenTitle = "Mobile";
        this.hideMobilePopUp = false;
        this.imageName = 'assets/verify-number/otp.png';
      }else if(screen == 'otp'){
        this.screenTitle = "OTP";
        this.hideOtpPopUp = false;
        this.imageName = 'assets/verify-number/otp.png';
      }else if(screen == 'forgotpassword'){
        this.screenTitle = "Forgot Password";
        this.hideMobilePopUp = false;
        this.imageName = 'assets/verify-number/forgotpassword.png';
      }else if(screen == 'changepassword'){
        this.screenTitle = "Change Password";
        this.hideResetForm = false;
        this.hideOldPassword = false;
      }
    });    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyNumberPage');
  }

  public generateOtp(){
    if(this.inputData.action == 'SIGNUP'){
      this.verifyMobile(this.inputData);
    }else if(this.inputData.action == 'FORGETPASSWORD'){
      this.forgotPassword(this.inputData);
    }
  }

  private verifyMobile(inputData){
    this.authProvider.login(inputData).subscribe(success => {      
		  if((success.status !== undefined)&&(success.status == '0001')) {
        this.authProvider.setCurrentUser(success);
        this.authProvider.setUserData(success);
        this.navCtrl.setRoot('HomePage');
      }else if((success.status !== undefined)&&(success.status == '0009')) {
        this.displayOTP(success);
      }else {
        this.authProvider.showError(success.status);
      }
    },
    error => {
        this.authProvider.showError(error);
    });
    this.inputData.action = 'SIGNUP';
  }

  private displayOTP(success){
    this.hideMobilePopUp = true;
    this.hideOtpPopUp = false;
    this.inputData.customerToken = success.jwtToken;
    this.inputData.userId = success.result.userId;
    this.hideMobCharacter(this.inputData.contactNumber);
  }

  private forgotPassword(inputData){
    this.authProvider.forgotPassword(inputData).subscribe(success => {      
      if((success.status !== undefined)&&(success.status == '0001')) {
          this.hideMobilePopUp = true;
          this.hideOtpPopUp = true;
          this.hideResetForm = false;
      }else if((success.status !== undefined)&&(success.status == '0009')) {
        this.displayOTP(success);
      }else if((success.status !== undefined)&&(success.status == '0017')) {
          this.inputData.action = 'SIGNIN';
          this.inputData.loginType = 'APP';
          this.inputData.password = this.password.value;
          this.verifyMobile(this.inputData);
      }else {
        this.authProvider.showError(success.status);
      }
    },
    error => {
      this.authProvider.showError(error);
    });
    this.inputData.action = 'FORGETPASSWORD';
  }

  public submitOtp(){
  	var OTP='';
  	for(var item in this.items){
  		OTP = OTP + this.items[item];
  	}
  	this.inputData.otp = parseInt(OTP);
    if(this.inputData.action == 'SIGNUP' || this.inputData.action == 'OTP'){
      this.inputData.action ='OTP'
      this.verifyMobile(this.inputData);
    }else if(this.inputData.action == 'FORGETPASSWORD'){
      this.inputData.action ='OTP'
      this.forgotPassword(this.inputData);
    }
  }
  
  changePassword(){
    if(this.inputData.action == 'FORGETPASSWORD'){
      this.inputData.action = 'SAVEPASSWORD';
      this.inputData.newPassword = this.password.value;
      this.forgotPassword(this.inputData);
    }if(this.inputData.action == 'CHANGEPASSWORD'){      
      this.inputData.newPassword = this.password.value;
      this.inputData.oldpassword = this.oldPassword.value;
      this.forgotPassword(this.inputData);
    }
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

  // countryselected(country){
  //   var countrycode = country;
  //   var countrySelected = document.getElementById(countrycode);
  //   var listElem = document.getElementsByTagName('li');
  //   if(this.listToggle){
  //     for(var i = 0; i < listElem.length; i++) {
  //       listElem[i].style.display = 'none';
  //     }
  //     countrySelected.style.display='block';
  //     this.listToggle = false;
  //     this.countryCodeSelected = countrySelected.getAttribute('data-code');
  //     console.log(this.countryCodeSelected);
  //   }else{
  //     for(var i = 0; i < listElem.length; i++) {
  //       listElem[i].style.display = 'block';
  //     }
  //     this.listToggle = true;
  //   } 
  // }

  getCountries(){
    return new Promise(resolve =>{
      this.http.get(`assets/data/countries.json`)
      .subscribe(res => resolve(res.json()));
    });
  }

  showSelect(){
    document.getElementById('selectTag').click();
  }

  optionsFn(){
    var countrySelected = document.getElementById(this.countryselected.countryAlpha);
    var listElem = document.getElementsByTagName('li');
    for(var i = 0; i < listElem.length; i++) {
      listElem[i].style.display = 'none';
    }
    countrySelected.style.display='block';
    this.countryCodeSelected =  this.countryselected.countryCode;
  }

}