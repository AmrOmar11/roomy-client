import { Component,Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController} from 'ionic-angular';
import { AuthenticateProvider,UserRequest } from '../../providers/authenticate/authenticate';
import { FacebookLoginService,GoogleLoginService } from '../../providers/providers';
import { Keyboard } from '@ionic-native/keyboard';
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

    loginForm:FormGroup;
    submitAttempt:boolean=false;
    userCredentials = { emailId: '',mobileNumber: '',password:'' };
    constructor(public navCtrl: NavController,
            private authProvider: AuthenticateProvider, 
            public facebookLoginService: FacebookLoginService,
            public googleLoginService: GoogleLoginService,
            public formBuilder:  FormBuilder,
            public keyboard:Keyboard
           ) {
        this.loginForm = this.formBuilder.group({
            username: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]+$'), Validators.required]),''],
            password: ['',Validators.compose([Validators.maxLength(10),Validators.required]),'']
        });
    }

    
    ionViewDidEnter(){
        this.keyboard.disableScroll(true);
    }

    doFacebookLogin() {
        this.authProvider.showLoading();
        let env = this;
        this.facebookLoginService.doFacebookLogin()
            .then(function(res){
                let inputData:UserRequest = new UserRequest();
                inputData.action = "SIGNIN";
                inputData.loginType = "FB";
                inputData.emailId = res.email;
                inputData.gender = res.gender;
                inputData.firstName = res.name;
                env.authenticate(inputData); 
        }, function(err){
            env.authProvider.hideLoading();
            //console.log("Facebook Login error", err);
            env.authProvider.showError("Facebook Login error");
        });
    }

    forgetPassword(){
        let inputData = new UserRequest();
        inputData.action = 'FORGETPASSWORD';
        this.navCtrl.push('VerifyNumberPage',{'inputData':inputData,'screen':'forgotpassword'});
    }

    doGoogleLogin() {
        this.authProvider.showLoading();
        let env = this;
        this.googleLoginService.doGoogleLogin()
            .then(function(res){
                let inputData:UserRequest = new UserRequest();
                inputData.action = "SIGNIN";
                inputData.loginType = "GMAIL";
                inputData.emailId = res.email;
                inputData.firstName = res.givenName;
                env.authenticate(inputData);
        }, function(err){
            env.authProvider.hideLoading();
            //console.log("Google Login error", err);
            env.authProvider.showError("Google Login error");
        });
    }

    SignUp() {
        this.navCtrl.push('SignupPage');
    }

    SignIn() {
        this.submitAttempt = true;
        if(this.loginForm.valid){
            let mobileRegex = /^[0-9]+$/;
            let inputData:UserRequest = new UserRequest();
            inputData.action = "SIGNIN";
            inputData.emailId = this.userCredentials.emailId;
            inputData.contactNumber = this.userCredentials.mobileNumber;
            inputData.loginType = "APP";
            inputData.password = this.userCredentials.password;
            if(inputData.emailId.match(mobileRegex)){
                inputData.contactNumber = this.userCredentials.emailId;
                inputData.emailId = '';
            }
            this.authenticate(inputData);
        }
    }
    
    authenticate(inputData){
        this.authProvider.login(inputData).subscribe(success => {
            if((success.status !== undefined)&&(success.status == '0001')) {
                this.authProvider.setCurrentUser(success);
                this.authProvider.setUserData(success);
                this.navCtrl.setRoot('HomePage');
            }else if((success.status !== undefined)&&(success.status == '0013')) {
                if(inputData.loginType == 'APP'){
                    this.authProvider.showError(success.statusMessage);
                }else{
                    inputData.action ='SIGNUP';
                    this.navCtrl.push('VerifyNumberPage',{'inputData':inputData,'screen':'mobile'});   
                }
            }else if((success.status !== undefined)&&(success.status == '0009')) {
                inputData.action ='OTP';
                inputData.token = success.jwtToken;
                inputData.userId = success.result.userId;
                this.navCtrl.push('VerifyNumberPage',{'inputData':inputData,'screen':'otp'});
            }else {
                this.authProvider.showError(success.statusMessage);
            }
        },
        error => {
            this.authProvider.showError(error);
        });
    }
}