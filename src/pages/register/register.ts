import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams,AlertController,LoadingController,Loading } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
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
  
  loading:Loading;
  createSuccess = false;
  registerForm:FormGroup;
  registerAttempt:boolean=false;
  registerCredentials = {
    contactNumber: "",
    emailAddress: "",
    firstName: "",
    lastName: "",
    loginPassword: "",
    middleName: ""
  };
 
  constructor(
    private nav: NavController, 
    public navParams: NavParams, 
    private auth: AuthenticateProvider, 
    private alertCtrl: AlertController, 
    public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController) {
      this.registerForm = this.formBuilder.group({
        firstname: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
        lastname: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
        mobile: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.required]),''],
        email: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.required]),''],
        password: ['',Validators.compose([Validators.required]),'']
      });    
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    this.registerAttempt = true;
    if(this.registerForm.valid){
      this.showLoading();
      console.log('registration:req:'+this.registerCredentials);
      this.auth.registerUser(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.nav.setRoot('HomePage',{userInfo:success});
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
    }
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
