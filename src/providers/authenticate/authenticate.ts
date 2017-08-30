import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Http,Headers,RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/Rx';

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
  userID:string;
  customerToken: string;
  constructor(){
    this.emailAddress='';
    this.contactNumber='';
    this.first_Name='';
    this.midle_Name='';
    this.last_Name='';
    this.dateOfBirth='';
    this.userID='';
    this.customerToken='';
  }
}
 
@Injectable()
export class AuthenticateProvider {
  currentUser: User;
  constructor(public platform: Platform,public http: Http,private nativeStorage: NativeStorage) {
  }
  
  public login(inputData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inputData);
    console.log('authenticate:login:req:'+inputData.action);
    return this.http.post('https://roomy-midtier.herokuapp.com/userRegistration',body,options).map(res => {
      console.log('authenticate:login:res');
      console.log(res.json());
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
    return this.http.post('https://roomy-midtier.herokuapp.com/userLogout',body,options).map(res => {
      console.log('authenticate:logout:res');
      console.log(res.json());
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
    return this.http.post('https://roomy-midtier.herokuapp.com/forgetPassword',body,options).map(res => {
      console.log('authenticate:forgotPassword:res');
      console.log(res.json());
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
  
  public updateProfile(data){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      customerToken: data.customerToken
    });
    console.log('authenticate:profile-update:req');
    return this.http.post('http://pobyt-webapp.azurewebsites.net/updateProfile',body,options)
    .map(res => {
      console.log('authenticate:profile-update:res');
      console.log(res.json());
      this.setCurrentUser(res.json());
      return this.currentUser;
    })
    .catch(this.handleError);
  }  

  public handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
