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
    // if (credentials.email === null || credentials.password === null) {
    //   return Observable.throw("Please insert credentials");
    // } else {
    //   return Observable.create(observer => {
    //     // At this point make a request to your backend to make a real check!
    //     let access = (credentials.password === "roomy" && credentials.email === "roomy@roomy.com");
    //     this.currentUser = new User('roomy', 'roomy@roomy.com');
    //     observer.next(access);
    //     observer.complete();
    //   });
    // }
    var headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      emailId: "",
      mobileNumber: credentials.email,
      password: credentials.password
    });
    return this.http.post('/login',body,options)
    .map(res => {
      console.log('user:'+res.json().toString());
      let data = res.json();
      this.currentUser = new User(data.responseData,
                                  data.userId,
                                  data.emailAddress,
                                  data.contactNumber,
                                  data.firstName,
                                  data.middleName,
                                  data.lastName,
                                  data.userType,
                                  data.customerToken);      
      return true;        
    })
    .catch(this.handleError);
  }
  
  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
