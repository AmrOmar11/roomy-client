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
    socialSignUpData = {
        contactNumber: "",
        emailAddress: "",
        firstName: "",
        lastName: "",
        loginPassword: "",
        middleName: ""
    };

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
        this.loading = this.loadingCtrl.create();
        // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
        let env = this;
        this.facebookLoginService.getFacebookUser()
            .then(function(data) {
            // user is previously logged with FB and we have his data we will let him access the app
            env.navCtrl.popToRoot();
        }, function(error){
            //we don't have the user data so we will ask him to log in
            env.facebookLoginService.doFacebookLogin()
                .then(function(res){
                env.socialSignUpData = {
                    contactNumber: "",
                    emailAddress: res.email,
                    firstName: res.name,
                    lastName: "",
                    loginPassword: "",
                    middleName: ""
                };
                console.log(env.socialSignUpData);
                env.showLoading();
                env.authProvider.registerUser(env.socialSignUpData).subscribe(success => {
                    if((success.statusCode !== undefined)&&(success.statusCode == 0)) {
                        env.loading.dismiss();
                        env.navCtrl.setRoot('HomePage');
                    } else {
                        env.showError(success.statusMessage);
                    }
                },
                error => {
                    this.showError(error);
                });
                env.loading.dismiss();
                env.navCtrl.popToRoot();
            }, function(err){
                console.log("Facebook Login error", err);
            });
        });
    }

    forgetPassword(){
        let modal = this.modalCtrl.create(ForgetModalPage);
        modal.present();
    }

    doGoogleLogin() {
        this.loading = this.loadingCtrl.create();
        // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
        let env = this;
        this.googleLoginService.trySilentLogin()
            .then(function(data) {
            // user is previously logged with Google and we have his data we will let him access the app
            env.navCtrl.popToRoot();
        }, function(error){
            //we don't have the user data so we will ask him to log in
            env.googleLoginService.doGoogleLogin()
                .then(function(res){
                env.socialSignUpData = {
                    contactNumber: "",
                    emailAddress: res.email,
                    firstName: res.displayName,
                    lastName: "",
                    loginPassword: "",
                    middleName: ""
                };
                console.log(env.socialSignUpData);
                env.showLoading();
                env.authProvider.registerUser(env.socialSignUpData).subscribe(success => {
                    if((success.statusCode !== undefined)&&(success.statusCode == 0)) {
                        env.loading.dismiss();
                        env.navCtrl.setRoot('HomePage');
                    } else {
                        env.showError(success.statusMessage);
                    }
                },
                error => {
                    this.showError(error);
                });
                env.loading.dismiss();
                env.navCtrl.popToRoot();
            }, function(err){
                console.log("Google Login error", err);
            });
        });
    }

    SignUp() {
        this.navCtrl.push('RegisterPage');
    }

    SignIn() {
        this.submitAttempt = true;
        if(this.loginForm.valid){
            this.showLoading();
            let mobileRegex = /^[0-9]+$/;
            let inputData = {
                action: "SIGNIN",
                conactNumber: this.userCredentials.mobileNumber,
                dob: '',
                emailId: this.userCredentials.emailId,
                gender: '',
                loginType: "APP",
                name: "",
                otp: "",
                password: this.userCredentials.password,
                token: '',
                userId: 0
            };
            if(inputData.emailId.match(mobileRegex)){
                inputData.conactNumber = this.userCredentials.emailId;
                inputData.emailId = '';
            }            
            this.authProvider.login(inputData).subscribe(success => {
                if((success.status !== undefined)&&(success.status == '0001')) {
                    this.authProvider.setCurrentUser(success);
                    this.authProvider.setUserData(success);
                    this.navCtrl.setRoot('HomePage');
                } else {
                    this.showError(success.statusMessage);
                }
            },
            error => {
                this.showError(error);
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

    showError(text) {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

}