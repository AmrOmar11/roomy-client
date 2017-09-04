import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { PasswordValidator } from  '../../validators/password';
import { UsernameValidator } from  '../../validators/username';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthenticateProvider,UserRequest } from '../../providers/authenticate/authenticate';
/**
 * Generated class for the ForgetModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-forget-modal',
    templateUrl: 'forget-modal.html',
})
export class ForgetModalPage {
    mobileForm: FormGroup;
    resetForm: FormGroup;
    emailId: AbstractControl;
    password: AbstractControl;
    re_password: AbstractControl;
    hideMobileForm:boolean = false;
    hideResetForm:boolean = true;
    hideResetClicked:boolean = false;
    constructor( 
        private navCtrl: NavController, 
        private alertCtrl: AlertController,
        private authProvider: AuthenticateProvider,
        private formBuilder: FormBuilder) {        
        this.resetForm = formBuilder.group({
            'password': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(45)]],
            're_password': ['', [Validators.required]]
            }, { 'validator': PasswordValidator.isMatching }
        );
        this.mobileForm = this.formBuilder.group({
            'emailId': ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9\.\@]+'), Validators.required,UsernameValidator.isValid]),''],
        });
        this.emailId = this.mobileForm.controls['emailId'];
        this.password = this.resetForm.controls['password'];
        this.re_password = this.resetForm.controls['re_password'];

    }

    dismiss(){
        this.navCtrl.pop();
    }

    sendOTP(){
        let inputData:UserRequest = new UserRequest();
        inputData.action = 'FORGETPASSWORD';
        let mobileRegex = /^[0-9]+$/;
        if(this.emailId.value.match(mobileRegex)){
            inputData.contactNumber = this.emailId.value;
        }else{
            inputData.emailId = this.emailId.value;
        }
        this.reset(inputData);
    }

    reset(inputData){
        this.authProvider.forgotPassword(inputData).subscribe(success => {
            if((success.status !== undefined)&&(success.status == '0001')) {
                this.hideMobileForm = true;
                this.hideResetForm = false;
                let condition:any = true;
                if(this.hideResetClicked === condition){
                    this.authenticate();    
                }                
            }else if((success.status !== undefined)&&(success.status == '0009')) {
                this.showOtpPoup(success);
            }else if((success.status !== undefined)&&(success.status == '0013')) {
                this.showError("User not found");
            }else if((success.status !== undefined)&&(success.status == '0007')) {
                this.showError("OTP Does not match");
            }else if((success.status !== undefined)&&(success.status == '0008')) {
                this.showError("OTP Expired");
            }else {
                this.showError(success.status);
            }
        },
        error => {
            this.showError("Service Error");
        });        
    }

    changePassword(){
        let reqData:UserRequest = new UserRequest();
        reqData.action = 'SAVEPASSWORD';
        reqData.newPassword = this.password.value;
        let mobileRegex = /^[0-9]+$/;
        if(this.emailId.value.match(mobileRegex)){
            reqData.contactNumber = this.emailId.value;
        }else{
            reqData.emailId = this.emailId.value;
        }
        this.hideResetForm  = true;
        this.hideResetClicked = true;
        this.reset(reqData);
    }

    authenticate(){
        let inputData:UserRequest = new UserRequest();
        inputData.action = 'SIGNIN';
        inputData.loginType = 'APP';
        inputData.password = this.password.value;
        let mobileRegex = /^[0-9]+$/;
        if(this.emailId.value.match(mobileRegex)){
            inputData.contactNumber = this.emailId.value;
        }else{
            inputData.emailId = this.emailId.value;
        }
        this.authProvider.login(inputData).subscribe(success => {
            if((success.status !== undefined)&&(success.status == '0001')) {
                this.authProvider.setCurrentUser(success);
                this.authProvider.setUserData(success);
                this.navCtrl.setRoot('HomePage');
            }else if((success.status !== undefined)&&(success.status == '0005')) {
                this.showError('Invalid Credentials');
            }else {
                this.showError('error');
            }
        },
        error => {
            this.showError(error);
        });
    }

    showOtpPoup(inputData){
        let confirm = this.alertCtrl.create({
            message: 'Please enter OTP:'+inputData.result.otp+' sent to  Mobile Number',
            inputs: [
                {
                    name: 'otp',
                    placeholder: '6 Digit OTP'
                }],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Send',
                    handler: data => {
                        let reqData:UserRequest = new UserRequest();
                        reqData.action = 'OTP';
                        reqData.otp = data.otp;
                        reqData.customerToken = inputData.jwtToken;
                        reqData.userId = inputData.result.userId;
                        this.reset(reqData);
                    }
                }
            ]
        });
        confirm.present();
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
