import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthenticateProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
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

    let headers = new Headers();
    // headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });
    let postParams = {      
        emailId: credentials.email,
        mobileNumber: "",
        password: credentials.password
    }
    let link = 'http://roomy-midtier.herokuapp.com/login';
    this.http.post(link, JSON.stringify(postParams),options).map(res=>res.json())
    .subscribe(data => {
        console.log("response:"+data);
        // this.data.response = data._body;
    }, error => {
        console.log("Oooops!");
    });
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
