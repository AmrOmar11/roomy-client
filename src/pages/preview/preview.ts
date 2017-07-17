import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PreviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {

  slides =[
     {
        "image":"assets/img/preview/screen1.png"
     },
     {
        "image":"assets/img/preview/screen2.png"
     },
     {
     	"image":"assets/img/preview/screen3.png"
     },
     {
     	"image":"assets/img/preview/screen4.png"
     }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewPage');
  }

  LoginIn(){
  	this.navCtrl.setRoot('LoginPage');
  }
  
  SignUp(){
  	this.navCtrl.setRoot('RegisterPage');
  }
}
