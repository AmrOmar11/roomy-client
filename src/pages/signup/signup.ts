import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticateProvider, UserRequest } from '../../providers/authenticate/authenticate';
import { Http } from '@angular/http';
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
    private items = ['','','','','',''];
    public countryList:any='';
    public countryselected:any = "";
	constructor(public navCtrl: NavController,
	 	public navParams: NavParams,
        public formBuilder: FormBuilder,
        private authProvider: AuthenticateProvider,
        private http:Http) {
		this.signUpData = new UserRequest();
		this.namesForm = this.formBuilder.group({
            firstName: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
            lastName: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
            gender: ['',Validators.compose([Validators.required]),''],
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
        this.getCountries().then((data)=>{
          this.countryList = data;
          this.countryselected = this.countryList[0];
        });
	}

	ionViewDidLoad() {
        this.slides.lockSwipes(true);
		console.log('ionViewDidLoad SignupPage');
	}
	
    mobileSubmit(){
        if(this.mobileForm.valid){
            let inputData = {
                contactNumber:this.signUpData.contactNumber,
                emailId:''
            };
            this.authProvider.mobileOrEmailExist(inputData).subscribe(success => {
                if((success.status !== undefined)&&(success.status == '0001')) {
                    this.goClicked();
                }else {
                    this.authProvider.showError(success.statusMessage);
                }
            },
            error => {
                this.authProvider.showError(error);
            });
        }
    }
	
	emailSubmit(){
		if(this.emailForm.valid){
            let inputData = {
                contactNumber:'',
                emailId:this.signUpData.emailId
            };
            this.authProvider.mobileOrEmailExist(inputData).subscribe(success => {
                if((success.status !== undefined)&&(success.status == '0001')) {
                    this.goClicked();
                }else {
                    this.authProvider.showError(success.statusMessage);
                }
            },
            error => {
                this.authProvider.showError(error);
            });
        }
	}
    
    namesSubmit(){
        if(this.namesForm.valid){
            this.goClicked();
        }
    }
	
	passwordSubmit(){
    	if(this.passwordForm.valid){
            this.signUpData.action = 'SIGNUP';
            this.signUpData.loginType = 'APP';
            this.signUpData.countryCode = this.countryselected.countryCode;
            this.authProvider.login(this.signUpData).subscribe(success => {
                if((success.status !== undefined)&&(success.status == '0009')) {
                    this.signUpData.action ='OTP';
                    this.signUpData.customerToken = success.jwtToken;
                    this.signUpData.userId = success.result.userId;
                    this.goClicked();
                }else {
                    this.authProvider.showError(success.statusMessage);
                }
            },
            error => {
                this.authProvider.showError(error);
            });
        }
	}
	
	otpSubmit(){
		if(this.otpForm.valid){
            var otp = '';
            for(var item in this.items){
              otp = otp + this.items[item];
            }
            this.signUpData.otp = parseInt(otp);
            this.signUpData.action = 'OTP';
            this.signUpData.loginType = 'APP';
            this.signUpData.countryCode = this.countryselected.countryCode;
            this.authProvider.login(this.signUpData).subscribe(success => {
                if((success.status !== undefined)&&(success.status == '0001')) {
                    this.authProvider.setCurrentUser(success);
                    this.authProvider.setUserData(success);
                    this.navCtrl.setRoot('HomePage');
                }else {
                    this.authProvider.showError(success.statusMessage);
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

    next(el) {
        el.setFocus();
    }

    getCountries(){
        return new Promise(resolve =>{
            this.http.get(`assets/data/countries.json`)
            .subscribe(res => resolve(res.json()));
        });
    }

    selectCountry(){
        document.getElementById('selectTag').click();
    }
}
