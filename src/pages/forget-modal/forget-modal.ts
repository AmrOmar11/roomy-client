import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { PasswordValidator } from  '../../validators/password';
import { UsernameValidator } from  '../../validators/username';
import { IonicPage, NavController, AlertController,LoadingController,Loading } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
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
    resetData = {
        action: "FORGOTPASSWORD",
        customerToken: '',
        emailId: '',
        mobilenNumber: '',
        otp:0,
        password:""
    };
    mobileForm: FormGroup;
    resetForm: FormGroup;
    emailId: any;
    password: AbstractControl;
    re_password: AbstractControl;
    loading:Loading;
    hideMobileForm:boolean = false;
    hideResetForm:boolean = true;
    constructor( 
        private navCtrl: NavController, 
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
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
        let mobileRegex = /^[0-9]+$/;
        if(this.emailId.value.match(mobileRegex)){
            this.resetData.mobilenNumber = this.emailId.value;
        }else{
            this.resetData.emailId = this.emailId.value;
        }
        this.reset(this.resetData);
    }

    reset(inputData){
        this.showLoading();
        this.authProvider.forgotPassword(inputData).subscribe(success => {
            if((success.status !== undefined)&&(success.status == '0001')) {
                this.hideMobileForm = true;
                this.hideResetForm = false;
            }else if((success.status !== undefined)&&(success.status == '0009')) {
                this.showOtpPoup(success);
            }else if((success.status !== undefined)&&(success.status == '0013')) {
                this.showError("error","User not found");
            }else if((success.status !== undefined)&&(success.status == '0007')) {
                this.showError("error","OTP Does not match");
            }else if((success.status !== undefined)&&(success.status == '0008')) {
                this.showError("error","OTP Expired");
            }else {
                this.showError("error",success.status);
            }
        },
        error => {
            this.showError("error","Service Error");
        });        
    }
    
    authenticate(){
        let inputData = {
            action: "SIGNIN",
            contactNumber: '',
            emailId: '',
            loginType: "APP",
            password: this.password.value,
            token:""
        };
        let mobileRegex = /^[0-9]+$/;
        if(this.emailId.value.match(mobileRegex)){
            inputData.contactNumber = this.emailId.value;
        }else{
            inputData.emailId = this.emailId.value;
        }
        this.showLoading();
        this.authProvider.login(inputData).subscribe(success => {
            if((success.status !== undefined)&&(success.status == '0001')) {
                this.authProvider.setCurrentUser(success);
                this.authProvider.setUserData(success);
                this.navCtrl.setRoot('HomePage');
            }else if((success.status !== undefined)&&(success.status == '0005')) {
                this.showError('error','Invalid Credentials');
            }else {
                this.showError('error','error');
            }
        },
        error => {
            this.showError('error','error');
        });
    }

    showOtpPoup(inputData){
        let confirm = this.alertCtrl.create({
            message: 'Please enter OTP:'+inputData.result.otp+' sent to  Mobile Number:'+this.resetData.mobilenNumber,
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
                        this.resetData.action ='OTP';
                        this.resetData.otp = data.otp;
                        this.resetData.customerToken = inputData.jwtToken;
                        this.reset(this.resetData);
                    }
                }
            ]
        });
        confirm.present();
    }
    
    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }
    
    showError(title, text) {
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
