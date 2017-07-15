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
  
  public login(credentials) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let mobileRegex = /^[0-9]+$/;
    if(credentials.emailId.match(mobileRegex)){
        credentials.mobileNumber = credentials.emailId;
        credentials.emailId = '';
    }
    let body = JSON.stringify({
      emailId: credentials.emailId,
      mobileNumber: credentials.mobileNumber,
      password: credentials.password
    });
    return this.http.post('https://roomy-midtier.herokuapp.com/login',body,options)
    .map(res => {
      console.log('login:res:'+res.json().toString());
      this.setUser(res.json());
      return this.currentUser;
    })
    .catch(this.handleError);
  }
  
  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  
  public registerUser(credentials) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({      
      contactNumber:credentials.contactNumber,
      emailAddress: credentials.emailAddress,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      loginPassword: credentials.loginPassword,
      middleName: ""
    });
    return this.http.post('https://roomy-midtier.herokuapp.com/registerUser',body,options)
    .map(res => {
      console.log('registration:res:'+res.json().toString());
      return this.authenticateUser(res.json(),credentials);
    })
    .catch(this.handleError);
  }
  
  authenticateUser(data,credentials){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({      
      customerToken: data.customerToken,
      otp: data.otp
    });
    return this.http.post('https://roomy-midtier.herokuapp.com/authenticateUser',body,options)
    .map(res => {
      console.log('autheticate:res:'+res.json().toString());
      credentials.customerToken = res.json().customerToken;
      credentials.responseData = res.json().responseMessage;
      this.setUser(credentials);
      return this.currentUser;
    })
    .catch(this.handleError); 
  }
  
  public getUserInfo() : User {
    return this.currentUser;
  }
  
  setUser(data){
    this.currentUser = new User(data.responseData,
                                  data.userId,
                                  data.emailAddress,
                                  data.contactNumber,
                                  data.firstName,
                                  data.middleName,
                                  data.lastName,
                                  data.userType,
                                  data.customerToken);
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
