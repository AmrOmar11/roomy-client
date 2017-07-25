import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/Rx';

/*
  Generated class for the AuthenticateProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
export class User {
  statusMessage: string;
  userId: string;
  emailAddress: string;
  contactNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  userType: string;
  customerToken: string 
  constructor(){
    this.statusMessage = '';
    this.userId='';
    this.emailAddress='';
    this.contactNumber='';
    this.firstName='';
    this.middleName='';
    this.lastName='';
    this.userType='',
    this.customerToken='';
  }
}
 
@Injectable()
export class AuthenticateProvider {
  currentUser: User;
  constructor(public http: Http) {
   console.log('Hello AuthenticateProvider');
  }
  
  public login(inputData) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      emailId: inputData.emailId,
      mobileNumber: inputData.mobileNumber,
      password: inputData.password
    });
    return this.http.post('https://roomy-midtier.herokuapp.com/login',body,options)
    .map(res => {
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
      contactNumber:inputData.contactNumber,
      emailAddress: inputData.emailAddress,
      firstName: inputData.firstName,
      lastName: inputData.lastName,
      loginPassword: inputData.loginPassword,
      middleName: ""
    });
    return this.http.post('https://roomy-midtier.herokuapp.com/registerUser',body,options)
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
      customerToken: inputData.customerToken,
      otp: inputData.otp
    });
    return this.http.post('https://roomy-midtier.herokuapp.com/authenticateUser',body,options)
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
      this.currentUser.emailAddress='muralidharn.dharan9@gmail.com';
      this.currentUser.contactNumber='9700222949';
      this.currentUser.firstName='murali';
      this.currentUser.lastName='kanamarlapudi';
    }
    return this.currentUser;
  }
  
  public setCurrentUser(data){
    this.currentUser = new User();
    this.currentUser.statusMessage = data.statusMessage;
    this.currentUser.userId = data.result.userId;
    this.currentUser.emailAddress = data.result.emailAddress;
    this.currentUser.contactNumber = data.result.contactNumber;
    this.currentUser.firstName = data.result.firstName;
    this.currentUser.middleName = data.result.middleName;
    this.currentUser.lastName = data.result.lastName;
    this.currentUser.userType = data.result.userType;
    this.currentUser.customerToken = data.customerToken;
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
    return this.http.post('https://roomy-midtier.herokuapp.com/updateProfile',body,options)
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
    return this.http.post('https://roomy-midtier.herokuapp.com/logout',body,options)
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
