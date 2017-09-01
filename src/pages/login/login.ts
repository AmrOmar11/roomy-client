import { Component,Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController, ModalController,LoadingController,AlertController,Loading,} from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { FacebookLoginService,GoogleLoginService } from '../../providers/providers';
import { UsernameValidator } from  '../../validators/username';
import { ForgetModalPage } from '../forget-modal/forget-modal';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    loading:Loading;
    loginForm:FormGroup;
    submitAttempt:boolean=false;
    userCredentials = { emailId: '',mobileNumber: '',password:'' };
    constructor(public navCtrl: NavController,
            private authProvider: AuthenticateProvider, 
            private alertCtrl: AlertController, 
            private loadingCtrl: LoadingController,
            public facebookLoginService: FacebookLoginService,
            public googleLoginService: GoogleLoginService,
            public formBuilder:  FormBuilder,
            public modalCtrl: ModalController
           ) {
        this.loginForm = this.formBuilder.group({
            username: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9\.\@]+'), Validators.required,UsernameValidator.isValid]),''],
            password: ['',Validators.compose([Validators.required]),'']
        });
    }

    doFacebookLogin() {
        this.showLoading();
        // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
        let env = this;
        this.facebookLoginService.getFacebookUser()
            .then(function(data) {
            // user is previously logged with FB and we have his data we will let him access the app
            env.authenticate({
                action: "SIGNIN",
                contactNumber:"",
                emailId: data.email,
                gender:data.gender,
                name: data.name,
                loginType: "FB",
                password:"",
                token:""
            });
        }, function(error){
            //we don't have the user data so we will ask him to log in
            env.facebookLoginService.doFacebookLogin()
                .then(function(res){
                    env.authenticate({
                        action: "SIGNIN",
                        contactNumber:"",
                        emailId: res.email,
                        gender:res.gender,
                        name: res.name,
                        loginType: "FB",
                        password:"",
                        token:""
                    }); 
            }, function(err){
                console.log("Facebook Login error", err);
                this.showError("Facebook Login error");
            });
        });
    }

    forgetPassword(){
        let modal = this.modalCtrl.create(ForgetModalPage);
        modal.present();
    }

    doGoogleLogin() {
        this.showLoading();
        // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
        let env = this;
        this.googleLoginService.trySilentLogin()
            .then(function(data) {
            // user is previously logged with Google and we have his data we will let him access the app
            env.authenticate({
                action: "SIGNIN",
                contactNumber:"",
                emailId: data.email,
                gender:'',
                name: data.displayName,
                loginType: "GMAIL",
                password:"",
                token:""
            });
        }, function(error){
            //we don't have the user data so we will ask him to log in
            env.googleLoginService.doGoogleLogin()
                .then(function(res){
                    env.authenticate({
                        action: "SIGNIN",
                        contactNumber:"",
                        emailId: res.email,
                        gender:'',
                        name: res.displayName,
                        loginType: "GMAIL",
                        password:"",
                        token:""
                    }); 
            }, function(err){
                console.log("Google Login error", err);
                this.showError("Google Login error");
            });
        });
    }

    SignUp() {
        this.navCtrl.push('RegisterPage');
    }

    SignIn() {
        this.submitAttempt = true;
        if(this.loginForm.valid){
            let mobileRegex = /^[0-9]+$/;
            let inputData = {
                action: "SIGNIN",
                contactNumber: '',
                emailId: this.userCredentials.emailId,
                loginType: "APP",
                password: this.userCredentials.password,
                token:""
            };
            if(inputData.emailId.match(mobileRegex)){
                inputData.contactNumber = this.userCredentials.emailId;
                inputData.emailId = '';
            }            
            this.authenticate(inputData);
        }
    }
    
    authenticate(inputData){
        this.showLoading();
        this.authProvider.login(inputData).subscribe(success => {
            if((success.status !== undefined)&&(success.status == '0001')) {
                this.authProvider.setCurrentUser(success);
                this.authProvider.setUserData(success);
                this.navCtrl.setRoot('HomePage');
            }else if((success.status !== undefined)&&(success.status == '0005')) {
                this.showError('Invalid Credentials');
            }else if((success.status !== undefined)&&(success.status == '0013')) {
                this.collectMobile(inputData);
            }else if((success.status !== undefined)&&(success.status == '0009')) {
                this.showOtpPoup(inputData,success);
            }else {
                this.showError(success.statusMessage);
            }
        },
        error => {
            this.showError(error);
        });
    }
    
    collectMobile(inputData){
        if(this.loading !== undefined){
            this.loading.dismiss();
        }
        let alert = this.alertCtrl.create({
            message: 'Please enter your Mobile Number:',
            inputs: [
                {
                    name: 'mobile',
                    placeholder: 'mobile'
                },
            ],
            buttons: [
                {
                    text: 'Done',
                    handler: data => {
                        inputData.action ='SIGNUP';
                        inputData.contactNumber =data.mobile;
                        this.authenticate(inputData);
                    }
                }
            ]
        });
        alert.present();
    }

    showOtpPoup(inputData,res){
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
                        inputData.action ='OTP';
                        inputData.otp = data.OTP;
                        inputData.token = res.jwtToken;
                        inputData.userId = res.result.userId;
                        this.authenticate(inputData);
                    }
                }
            ]
        });
        alert.present();
    }
    showLoading() {
        if(this.loading !== undefined){
            this.loading.dismiss();
        }
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    showError(text) {
        if(this.loading !== undefined){
            this.loading.dismiss();
        }
        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

}