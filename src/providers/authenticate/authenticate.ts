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
  customerToken: string ;
  constructor(){
    this.emailAddress='';
    this.contactNumber='';
    this.first_Name='';
    this.midle_Name='';
    this.last_Name='';
    this.dateOfBirth='';
    this.customerToken='';
  }
}
 
@Injectable()
export class AuthenticateProvider {
  currentUser: User;
  constructor(public platform: Platform,public http: Http,private nativeStorage: NativeStorage) {
   console.log('Hello AuthenticateProvider');
  }
  
  public login(inputData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(inputData);
    return this.http.post('https://roomy-midtier.herokuapp.com/userRegistration',body,options).map(res => {
      console.log('login:res:'+res.json().toString());
      return res.json();
    })
    .catch(this.handleError);
  }
  
  public registerUser(inputData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({      
      action: "signin",
      conactNumber: inputData.mobileNumber,
      dob: inputData.dob,
      emailId: inputData.emailId,
      gender: inputData.gender,
      loginType: "web",
      name: inputData.name,
      otp: "",
      password: inputData.password,
      token: "",
      userID: 0
    });
    return this.http.post('https://roomy-midtier.herokuapp.com/userRegistration',body,options)
    .map(res => {
      console.log('registration:res:'+res.json());
      inputData.statusCode = res.json().statusCode;
      inputData.customerToken = res.json().customerToken;
      inputData.otp = res.json().result;
      return inputData;
    })
    .catch(this.handleError);
  }
  
  authenticateUser(inputData){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({      
      action: "otp",
      conactNumber: "",
      dob: "",
      emailId: "",
      gender: "",
      loginType: "web",
      name: "",
      otp: inputData.otp,
      password: "",
      token: inputData.customerToken,
      userID: 0
    });
    return this.http.post('https://roomy-midtier.herokuapp.com/userRegistration',body,options)
    .map(res => {
      console.log('autheticate:res:'+res.json().toString());
      inputData.statusCode = res.json().statusCode;
      inputData.customerToken = res.json().customerToken;
      inputData.statusMessage = res.json().statusMessage;
      return inputData;
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
    this.currentUser.dateOfBirth = data.dateOfBirth;
    this.currentUser.customerToken = data.jwtToken;
  }

  public setUserData(data){
    if (this.platform.is('cordova')){
      this.nativeStorage.setItem('userdata', {customerToken: data.jwtToken})
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
    }
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  } 
  
  public updateProfile(data){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      customerToken: data.customerToken
    });
    return this.http.post('http://pobyt-webapp.azurewebsites.net/updateProfile',body,options)
    .map(res => {
      console.log('updateProfile:res:'+res.json().toString());
      this.setCurrentUser(res.json());
      return this.currentUser;
    })
    .catch(this.handleError);
  }

  public singOut(data){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      customerToken: data.customerToken
    });
    return this.http.post('http://pobyt-webapp.azurewebsites.net/logout',body,options)
    .map(res => {
      console.log('logout:res:'+res.json().toString());
      this.setCurrentUser(res.json());
      return this.currentUser;
    })
    .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
