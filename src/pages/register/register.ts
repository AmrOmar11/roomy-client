import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController} from 'ionic-angular';
import { AuthenticateProvider, UserRequest } from '../../providers/authenticate/authenticate';
import { Http } from '@angular/http';
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
    public countryCodeSelected = "+91";
    public countryselected:any = "";
    public countryList:any=[];
    public contactNumber:any;
    constructor(
        private navCtrl: NavController, 
        private authProvider: AuthenticateProvider, 
        public formBuilder: FormBuilder,
        private http:Http) {
        this.getCountries().then((data)=>{
            this.countryList = data;
        });
        this.signUpData = new UserRequest();
        this.signUpForm = this.formBuilder.group({
            firstName: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
            lastName: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
            contactNumber: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.required]),''],
            emailId: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.required]),''],
            password: ['',Validators.compose([Validators.required]),''],
            gender: ['',Validators.compose([Validators.required]),''],
            dob: ['',Validators.compose([Validators.required]),''],
            countryList:['',Validators.compose([]),'']
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
            this.signUpData.contactNumber = this.countryCodeSelected + this.contactNumber;
            this.authProvider.login(this.signUpData).subscribe(success => {
                if((success.status !== undefined)&&(success.status == '0009')) {
                    this.signUpData.action ='OTP';
                    this.signUpData.customerToken = success.jwtToken;
                    this.signUpData.userId = success.result.userId;
                    this.signUpData.contactNumber = success.result.contactNumber;
                    this.navCtrl.push('VerifyNumberPage',{'inputData':this.signUpData,'screen':'otp'});
                }else {
                    this.authProvider.showError(success.statusMessage);
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
            }else{
                this.authProvider.showError(success.statusMessage);
            }
        },
        error => {
            this.authProvider.showError(error);
        });
    }
    
    openTerms() {
        this.navCtrl.push('PoliciesPage');
    }

    getCountries(){
        return new Promise(resolve =>{
          this.http.get(`assets/data/countries.json`)
          .subscribe(res => resolve(res.json()));
        });
    }

    showSelect(){
        document.getElementById('selectTag').click();
    }

    optionsFn(){
        var countrySelected = document.getElementById(this.countryselected.countryAlpha);
        var listElem = document.getElementsByTagName('li');
        for(var i = 0; i < listElem.length; i++) {
          listElem[i].style.display = 'none';
        }
        countrySelected.style.display='block';
        this.countryCodeSelected =  this.countryselected.countryCode;
    }
    
}
