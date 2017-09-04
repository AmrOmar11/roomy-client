import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
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
  first_Name: string;
  midle_Name: string;
  last_Name: string;
  dateOfBirth:string;
  userID:number;
  customerToken: string;
  constructor(){
    this.emailAddress='';
    this.contactNumber='';
    this.first_Name='';
    this.midle_Name='';
    this.last_Name='';
    this.dateOfBirth='';
    this.userID=0;
    this.customerToken='';
  }
}

export class UserRequest {
  action: string;
  contactNumber: string;
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
    public platform: Platform,
    public http: Http,
    private nativeStorage: NativeStorage,
    private loadingCtrl: LoadingController,
    public facebookLoginService: FacebookLoginService,
    public googleLoginService: GoogleLoginService) {
      
    }
  
  public login(inputData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inputData);
    console.log('authenticate:login:req:'+inputData.action);
    this.showLoading();
    return this.http.post('https://roomy-midtier.herokuapp.com/userRegistration',body,options).map(res => {
      console.log('authenticate:login:res');
      console.log(res.json());
      this.hideLoading();
      return res.json();
    })
    .catch(this.handleError);
  }
  
  public logout(inputData){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inputData);
    console.log('authenticate:logout:req');
    this.showLoading();
    return this.http.post('https://roomy-midtier.herokuapp.com/userLogout',body,options).map(res => {
      console.log('authenticate:logout:res');
      console.log(res.json());
      this.hideLoading();
      return res.json();
    })
    .catch(this.handleError);
  }

  public forgotPassword(inputData){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inputData);
    console.log('authenticate:forgotPassword:req');
    this.showLoading();
    return this.http.post('https://roomy-midtier.herokuapp.com/forgetPassword',body,options).map(res => {
      console.log('authenticate:forgotPassword:res');
      console.log(res.json());
      this.hideLoading();
      return res.json();
    })
    .catch(this.handleError);
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
    this.currentUser.first_Name = data.result.first_Name;
    this.currentUser.midle_Name = data.result.midle_Name;
    this.currentUser.last_Name = data.result.last_Name;
    this.currentUser.dateOfBirth = data.result.dateOfBirth;
    this.currentUser.userID = data.result.userID;
    this.currentUser.customerToken = data.jwtToken;
  }

  public setUserData(data){
    if(this.platform.is('cordova')){
      this.nativeStorage.setItem('userdata', {customerToken: data.jwtToken})
      .then(
        () => console.log('Stored userdata in nativeStorage'),
        error => console.error('Error storing item', error)
      );
    }
  }

  public removeUser(){
    if(this.platform.is('cordova')){
      this.nativeStorage.remove('userdata');
      this.facebookLoginService.doFacebookLogout();
      this.googleLoginService.doGoogleLogout();          
    }
  }
  
  public updateProfile(data){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      customerToken: data.customerToken
    });
    console.log('authenticate:profile-update:req');
    this.showLoading();
    return this.http.post('http://pobyt-webapp.azurewebsites.net/updateProfile',body,options)
    .map(res => {
      console.log('authenticate:profile-update:res');
      console.log(res.json());
      this.setCurrentUser(res.json());
      this.hideLoading();
      return this.currentUser;
    })
    .catch(this.handleError);
  }  
  
  public getHotels(inputData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inputData);
    console.log('HotelsbyLocation:req:');
    this.showLoading('Fetching Hotels...');
    return this.http.post('https://roomy-midtier.herokuapp.com/getHotelsbyLocation',body,options)
    .map(res => {
      console.log('HotelsbyLocation:res:');
      console.log(res.json());
      this.hideLoading();
      return res.json();
    })
    .catch(this.handleError);
  }

  public getHotelDetails(inputData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inputData);
    console.log('HotelDetails:req:'+inputData.hotelId);
    this.showLoading('Fetching Hotel...');
    return this.http.post('https://roomy-midtier.herokuapp.com/getHotelDetails',body,options)
    .map(res => {
      console.log('HotelDetails:res:');
      console.log(res.json());
      return res.json();
    })
    .catch(this.handleError);
  }

  public handleError(error) {
    console.error(error);
    this.hideLoading();
    return Observable.throw(error.json().error || 'Server error');
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
