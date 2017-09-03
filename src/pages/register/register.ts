import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthenticateProvider, UserRequest } from '../../providers/authenticate/authenticate';
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

    signUpSuccess = false;
    signUpForm:FormGroup;
    signUpAttempt:boolean=false;
    signUpData:UserRequest;
    constructor(
        private navCtrl: NavController, 
        private authProvider: AuthenticateProvider, 
        private alertCtrl: AlertController, 
        public formBuilder: FormBuilder) {
        this.signUpData = new UserRequest();
        this.signUpForm = this.formBuilder.group({
            firstName: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
            lastName: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
            contactNumber: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.required]),''],
            emailId: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.required]),''],
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
            this.signUpData.action = 'SIGNUP';
            this.signUpData.loginType = 'APP';
            this.authProvider.login(this.signUpData).subscribe(success => {
                if((success.status !== undefined)&&(success.status == '0009')) {
                    this.showOtpPoup(success);
                }else if((success.status !== undefined)&&(success.status == '0002')){
                    this.showError('Mobile Numer already exis');
                }else if((success.status !== undefined)&&(success.status == '0003')){
                    this.showError('Email ID already exit');
                } else {
                    this.showError(success.status);
                }
            },
            error => {
                this.showError(error);
            });
        }
    }

    showOtpPoup(inputData){
        let alert = this.alertCtrl.create({
            message: 'Please enter OTP:'+inputData.result.otp+' sent to your Mobile Number',
            inputs: [
                {
                    name: 'otp',
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
                        this.signUpData.action = 'OTP';
                        this.signUpData.otp = data.otp;
                        this.signUpData.customerToken = inputData.jwtToken;
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
                this.showError('OTP does not match');
            }else if((success.status !== undefined)&&(success.status == '0008')){
                this.showError('OTP Expried');
            }else{
                this.showError(success.status);
            }
        },
        error => {
            this.showError(error);
        });
    }
    
    openTerms() {
        this.navCtrl.push('PoliciesPage');
    }

    showError(text) {
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: [
                {
                    text: 'OK',
                    handler: data => {
                    }
                }
            ]
        });
        alert.present();
    }

}
