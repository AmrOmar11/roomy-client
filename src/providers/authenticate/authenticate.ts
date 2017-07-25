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
  responseData: string;
  userId: string;
  emailAddress: string;
  contactNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  userType: string;
  customerToken: string 
  constructor(
    responseData: string,
    userId: string,
    emailAddress: string,
    contactNumber: string,
    firstName: string,
    middleName: string,
    lastName: string,
    userType: string,
    customerToken: string 
    ){
    this.responseData = responseData;
    this.userId=userId;
    this.emailAddress=emailAddress;
    this.contactNumber=contactNumber;
    this.firstName=firstName;
    this.middleName=middleName;
    this.lastName=lastName;
    this.userType=userType,
    this.customerToken=customerToken;
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
    return this.http.post('/login',body,options)
    .map(res => {
      console.log('login:res:'+res.json().toString());
      this.setUser(res.json());
      return this.currentUser;
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
      console.log('registration:res:'+res);
      inputData.customerToken = res.json().customerToken;
      inputData.otp = res.json().otp;
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
      inputData.customerToken = res.json().customerToken;
      inputData.responseData = res.json().failureMessage;
      this.setUser(inputData);
      return this.currentUser;
    })
    .catch(this.handleError); 
  }
  
  public getUserInfo() : User {
    return this.currentUser;
  }
  
  setUser(data){
    this.currentUser = new User(data.responseData,
                                  data.result.userId,
                                  data.result.emailAddress,
                                  data.result.contactNumber,
                                  data.result.firstName,
                                  data.result.middleName,
                                  data.result.lastName,
                                  data.result.userType,
                                  data.jwtToken);
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
      this.setUser(res.json());
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
      this.setUser(res.json());
      return this.currentUser;
    })
    .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
