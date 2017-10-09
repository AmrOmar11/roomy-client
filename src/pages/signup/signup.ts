import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticateProvider, UserRequest } from '../../providers/authenticate/authenticate';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	@ViewChild(Slides) slides: Slides;
	public namesForm:FormGroup;
	public emailForm:FormGroup;
	public mobileForm:FormGroup;
	public passwordForm:FormGroup;
    public otpForm:FormGroup;
	public signUpData:UserRequest;
	public contactNumber:any;
	constructor(public navCtrl: NavController,
	 	public navParams: NavParams,
        public formBuilder: FormBuilder,
        private authProvider: AuthenticateProvider) {
		this.signUpData = new UserRequest();
		this.namesForm = this.formBuilder.group({
            firstName: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
            lastName: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),'']
        });
        this.emailForm = this.formBuilder.group({
            emailId: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.required]),'']
        });
        this.mobileForm = this.formBuilder.group({
            contactNumber: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.required]),'']
        });
        this.passwordForm = this.formBuilder.group({
            password: ['',Validators.compose([Validators.required]),'']
        });
        this.otpForm = this.formBuilder.group({
            number1: ['',Validators.compose([Validators.maxLength(1), Validators.pattern('[0-9]+'), Validators.required]),''],
            number2: ['',Validators.compose([Validators.maxLength(1), Validators.pattern('[0-9]+'), Validators.required]),''],
            number3: ['',Validators.compose([Validators.maxLength(1), Validators.pattern('[0-9]+'), Validators.required]),''],
            number4: ['',Validators.compose([Validators.maxLength(1), Validators.pattern('[0-9]+'), Validators.required]),''],
            number5: ['',Validators.compose([Validators.maxLength(1), Validators.pattern('[0-9]+'), Validators.required]),''],
            number6: ['',Validators.compose([Validators.maxLength(1), Validators.pattern('[0-9]+'), Validators.required]),'']
        });
	}

	ionViewDidLoad() {
        this.slides.lockSwipes(true);
		console.log('ionViewDidLoad SignupPage');
	}
	
    mobileSubmit(){
        this.goClicked();
        if(this.mobileForm.valid){
            this.authProvider.mobileOrEmailExist(this.signUpData).subscribe(success => {
                if((success.status !== undefined)&&(success.status == '0001')) {
                    this.goClicked();
                }else {
                    this.authProvider.showError(success.status);
                }
            },
            error => {
                this.authProvider.showError(error);
            });
        }
    }
	
	emailSubmit(){
		this.goClicked();
		if(this.emailForm.valid){
            this.authProvider.mobileOrEmailExist(this.signUpData).subscribe(success => {
                if((success.status !== undefined)&&(success.status == '0001')) {
                    this.goClicked();
                }else {
                    this.authProvider.showError(success.status);
                }
            },
            error => {
                this.authProvider.showError(error);
            });
        }
	}
    
    namesSubmit(){
        this.goClicked();
        if(this.namesForm.valid){
            this.goClicked();
        }
    }
	
	passwordSubmit(){
        this.goClicked();
    	if(this.passwordForm.valid){
            this.signUpData.action = 'SIGNUP';
            this.signUpData.loginType = 'APP';
            // this.signUpData.contactNumber = this.countryCodeSelected + this.contactNumber;
            this.authProvider.login(this.signUpData).subscribe(success => {
                if((success.status !== undefined)&&(success.status == '0009')) {
                    this.signUpData.action ='OTP';
                    this.signUpData.customerToken = success.jwtToken;
                    this.signUpData.userId = success.result.userId;
                    this.signUpData.contactNumber = success.result.contactNumber;
                    this.goClicked();
                }else {
                    this.authProvider.showError(success.status);
                }
            },
            error => {
                this.authProvider.showError(error);
            });
        }
	}
	
	otpSubmit(){
		if(this.otpForm.valid){
            this.signUpData.action = 'SIGNUP';
            this.signUpData.loginType = 'APP';
            // this.signUpData.contactNumber = this.countryCodeSelected + this.contactNumber;
            this.authProvider.login(this.signUpData).subscribe(success => {
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
	}

	goClicked(){
	    this.slides.lockSwipeToNext(false);
	    this.slides.slideNext();
	    this.slides.lockSwipeToNext(true);
	}
}
