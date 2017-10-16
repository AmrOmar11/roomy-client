import { Injectable } from '@angular/core';
import { Platform,AlertController} from 'ionic-angular';
import { LoadingController,Loading} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Http,Headers,RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/Rx';
import { FacebookLoginService,GoogleLoginService } from '../../providers/providers';
/*
  Generated class for the AuthenticateProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
export class User {
  emailAddress: string;
  contactNumber: string;
  firstName: string;
  midleName: string;
  lastName: string;
  dateOfBirth:string;
  userID:number;
  referralCode:string;
  customerToken: string;
  constructor(){
    this.emailAddress='';
    this.contactNumber='';
    this.firstName='';
    this.midleName='';
    this.lastName='';
    this.dateOfBirth='';
    this.userID=0;
    this.referralCode='';
    this.customerToken='';
  }
}

export class UserRequest {
  action: string;
  contactNumber: string;
  countryCode : string;
  customerToken: string;
  dob: string;
  emailId: string;
  firstName:string;
  gender:string;
  lastName: string;
  loginType:string;
  otp:number;
  password:string;
  userId:number;
  newPassword: string;
  oldpassword:string;
  constructor(){
    this.action = '';
    this.contactNumber = '';
    this.countryCode = '';
    this.customerToken = '';
    this.dob = '';
    this.emailId = '';
    this.firstName = '';
    this.gender = '';
    this.lastName = '';
    this.loginType = '' ;
    this.otp = 0;
    this.password = '';
    this.userId = 0;
    this.newPassword = '';
    this.oldpassword = '';
  }
}
 
@Injectable()
export class AuthenticateProvider {
  currentUser: User;
  loading:Loading;

  constructor(
    private platform: Platform,
    private http: Http,
    private nativeStorage: NativeStorage,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, 
    private facebookLoginService: FacebookLoginService,
    private googleLoginService: GoogleLoginService) {
      
    }
  
  public login(inputData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inputData);
    //console.log('authenticate:login:req:',inputData);
    var env = this;
    this.showLoading();
    return this.http.post('http://pobyt-webapp.azurewebsites.net/userRegistration',body,options).map(res => {
      env.hideLoading();
      return res.json();
    })
    .catch(this.handleError.bind(env));
  }
  
  public logout(inputData){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inputData);
    //console.log('authenticate:logout:req:',inputData);
    var env = this;
    this.showLoading();
    return this.http.post('http://pobyt-webapp.azurewebsites.net/userLogout',body,options).map(res => {
      //console.log('authenticate:logout:res:',res.json());
      env.hideLoading();
      return res.json();
    })
    .catch(this.handleError.bind(env));
  }

  public forgotPassword(inputData){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inputData);
    //console.log('authenticate:forgotPassword:req:',inputData);
    var env = this;
    this.showLoading();
    return this.http.post('http://pobyt-webapp.azurewebsites.net/forgetPassword',body,options).map(res => {
      //console.log('authenticate:forgotPassword:res:',res.json());
      env.hideLoading();
      return res.json();
    })
    .catch(this.handleError.bind(env));
  }

  public getUserInfo() : User {
    if(this.currentUser == undefined){
      this.currentUser = new User();
    }
    return this.currentUser;
  }
  
  public setCurrentUser(data){
    this.currentUser = new User();
    this.currentUser.emailAddress = data.result.emailAddress;
    this.currentUser.contactNumber = data.result.contactNumber;
    this.currentUser.firstName = data.result.firstName;
    this.currentUser.midleName = data.result.midleName;
    this.currentUser.lastName = data.result.lastName;
    this.currentUser.dateOfBirth = data.result.dateOfBirth;
    this.currentUser.userID = data.result.userID;
    this.currentUser.referralCode = data.result.referralCode;
    this.currentUser.customerToken = data.jwtToken;
  }

  public setUserData(data){
    if(this.platform.is('cordova')){
      this.nativeStorage.setItem('userdata', {customerToken: data.jwtToken});
      // .then(
      //   () => {
      //     console.log('Stored userdata in nativeStorage')
      //   },
      //   error =>{// console.error('Error storing item', error)
      //   }
      //);
    }
  }

  public removeUser(){
    if(this.platform.is('cordova')){
      this.nativeStorage.remove('userdata');
      this.facebookLoginService.doFacebookLogout();
      this.googleLoginService.doGoogleLogout();          
    }
  }
  
  public updateProfile(inputData){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      customerToken: inputData.customerToken
    });
    //console.log('authenticate:profile-update:req',inputData);
    var env = this;
    this.showLoading();
    return this.http.post('http://pobyt-webapp.azurewebsites.net/updateProfile',body,options)
    .map(res => {
      //console.log('authenticate:profile-update:res',res.json());
      env.setCurrentUser(res.json());
      env.hideLoading();
      return this.currentUser;
    })
    .catch(this.handleError.bind(env));
  }  
  
  public getHotels(inputData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inputData);
    //console.log('HotelsbyLocation:req:',inputData);
    var env = this;
    this.showLoading('Fetching Hotels...');
    return this.http.post('http://pobyt-webapp.azurewebsites.net/getHotelsbyLocation',body,options)
    .map(res => {
      //console.log('HotelsbyLocation:res:',res.json());
      env.hideLoading();
      return res.json();
    })
    .catch(this.handleError.bind(env));
  }

  public getHotelDetails(inputData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inputData);
    //console.log('HotelDetails:req:',inputData);
    var env = this;
    this.showLoading('Fetching Hotel...');
    return this.http.post('http://pobyt-webapp.azurewebsites.net/getHotelDetails',body,options)
    .map(res => {
      //console.log('HotelDetails:res:',res.json());
      env.hideLoading();
      return res.json();
    })
    .catch(this.handleError.bind(env));
  }

  public mobileOrEmailExist(inputData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inputData);
    var env = this;
    this.showLoading('');
    //console.log('checkUserExistOrNot:req:',inputData);
    return this.http.post('http://pobyt-webapp.azurewebsites.net/checkUserExistOrNot',body,options)
    .map(res => {
      //console.log('checkUserExistOrNot:res:',res.json());
      env.hideLoading();
      return res.json();
    })
    .catch(this.handleError.bind(env));
  }

  public handleError(error) {
    console.error(error);
    this.hideLoading();
    return Observable.throw(error.json().error || 'Server error');
  }

  public showError(text) {
    let alert = this.alertCtrl.create({
        title: ':( Oops!',
        message: text,
        buttons: [
            {
                text: 'OK',
                handler: data => {
                }
            }
        ]
    });
    alert.present(prompt);
  }
  
  public showLoading(inputData:string='Please wait...') {
    this.loading = this.loadingCtrl.create({
        content: inputData,
        dismissOnPageChange: true
    });
    this.loading.present();
  }

  public showLoadingText(inputData) {
    if(this.loading !== undefined){
        this.loading.setContent(inputData);
    }
  }

  public hideLoading() {
    if(this.loading !== undefined){
        this.loading.dismiss();
    }
  }

}
