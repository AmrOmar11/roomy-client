import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController} from 'ionic-angular';
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
        //console.log('ionViewDidLoad RegisterPage');
    }

    singUpSubmit() {
        this.signUpAttempt = true;
        if(this.signUpForm.valid){
            this.signUpData.action = 'SIGNUP';
            this.signUpData.loginType = 'APP';
            this.authProvider.login(this.signUpData).subscribe(success => {
                if((success.status !== undefined)&&(success.status == '0009')) {
                    this.signUpData.action ='OTP';
                    this.signUpData.customerToken = success.jwtToken;
                    this.signUpData.userId = success.result.userId;
                    this.signUpData.contactNumber = success.result.contactNumber;
                    this.navCtrl.push('VerifyNumberPage',{'inputData':this.signUpData,'screen':'otp'});
                }else if((success.status !== undefined)&&(success.status == '0002')){
                    this.authProvider.showError('Mobile Numer already exis');
                }else if((success.status !== undefined)&&(success.status == '0003')){
                    this.authProvider.showError('Email ID already exit');
                } else {
                    this.authProvider.showError(success.status);
                }
            },
            error => {
                this.authProvider.showError(error);
            });
        }
    }

    authenticateUser(inputData){
        this.authProvider.login(inputData).subscribe(success => {
            if((success.status !== undefined)&&(success.status == '0001')) {
                this.authProvider.setCurrentUser(success);
                this.authProvider.setUserData(success);
                this.navCtrl.setRoot('HomePage');
            }else if((success.status !== undefined)&&(success.status == '0007')){
                this.authProvider.showError('OTP does not match');
            }else if((success.status !== undefined)&&(success.status == '0008')){
                this.authProvider.showError('OTP Expried');
            }else{
                this.authProvider.showError(success.status);
            }
        },
        error => {
            this.authProvider.showError(error);
        });
    }
    
    openTerms() {
        this.navCtrl.push('PoliciesPage');
    }
    
}
