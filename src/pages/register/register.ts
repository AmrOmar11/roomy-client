import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController, AlertController,LoadingController,Loading } from 'ionic-angular';
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
        action:'SIGNUP',
        contactNumber: '',
        dob: '',
        emailId: '',
        gender:'',
        loginType: 'APP',
        name: '',
        lastName: '',
        otp: 0,
        password: '',
        token: '',
        userId: 0
    };

    constructor(
        private navCtrl: NavController, 
        private authProvider: AuthenticateProvider, 
        private alertCtrl: AlertController, 
        public formBuilder: FormBuilder,
        private loadingCtrl: LoadingController) {
        this.signUpForm = this.formBuilder.group({
            firstname: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
            lastname: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
            mobile: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.required]),''],
            email: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.required]),''],
            password: ['',Validators.compose([Validators.required]),''],
            gender: ['',Validators.compose([Validators.required]),''],
            dob: ['',Validators.compose([Validators.required]),'']
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
            this.signUpData.action = 'SIGNUP';
            this.signUpData.otp = 0;
            this.signUpData.userId = 0;
            this.authProvider.login(this.signUpData).subscribe(success => {
                if((success.status !== undefined)&&(success.status == '0009')) {
                    this.showOtpPoup(success);
                }else if((success.status !== undefined)&&(success.status == '0002')){
                    this.showPopup("Error", 'Mobile Numer already exis');
                }else if((success.status !== undefined)&&(success.status == '0003')){
                    this.showPopup("Error", 'Email ID already exit');
                } else {
                    this.showPopup("Error", success.status);
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
            message: 'Please enter OTP:'+inputData.result.otp+' sent to your Mobile Number:'+inputData.result.contactNumber,
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
                        this.signUpData.action ='OTP';
                        this.signUpData.otp = data.OTP;
                        this.signUpData.token = inputData.jwtToken;
                        this.signUpData.userId = inputData.result.userId;
                        this.authenticateUser(this.signUpData);
                    }
                }
            ]
        });
        alert.present();
    }

    authenticateUser(inputData){
        this.authProvider.login(inputData).subscribe(success => {
            if((success.status !== undefined)&&(success.status == '0001')) {
                this.authProvider.setCurrentUser(success);
                this.authProvider.setUserData(success);
                this.navCtrl.setRoot('HomePage');
            }else if((success.status !== undefined)&&(success.status == '0007')){
                this.showPopup("Error", 'OTP does not match');
            }else if((success.status !== undefined)&&(success.status == '0008')){
                this.showPopup("Error", 'OTP Expried');
            }else{
                this.showPopup("Error", success.status);
            }
        },
        error => {
            this.showPopup("Error", error);
        });
    }
    
    openTerms() {
        this.navCtrl.push('PoliciesPage');
    }

    showPopup(title, text) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: data => {
                        this.loading.dismiss();
                    }
                }
            ]
        });
        alert.present();
    }

}
