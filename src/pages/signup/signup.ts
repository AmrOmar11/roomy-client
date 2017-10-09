import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticateProvider, UserRequest } from '../../providers/authenticate/authenticate';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	@ViewChild(Slides) slides: Slides;
	public namesForm:FormGroup;
	public emailForm:FormGroup;
	public mobileForm:FormGroup;
	public passwordForm:FormGroup;
	public signUpData:UserRequest;
	public contactNumber:any;
	constructor(public navCtrl: NavController,
	 	public navParams: NavParams,
        public formBuilder: FormBuilder) {
		this.signUpData = new UserRequest();
		this.namesForm = this.formBuilder.group({
            firstName: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
            lastName: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),'']
        });
        this.emailForm = this.formBuilder.group({
            emailId: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.required]),'']
        });
        this.mobileForm = this.formBuilder.group({
            contactNumber: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.required]),'']
        });
        this.passwordForm = this.formBuilder.group({
            password: ['',Validators.compose([Validators.required]),'']
        });
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SignupPage');
	}
	
	namesGoClicked(){
		this.goClicked();
	}
	
	emailGoClicked(){
		this.goClicked();
	}
	mobileGoClicked(){
		this.goClicked();
	}
	passwordGoClicked(){
		this.goClicked();	
	}
	goClicked(){
	    this.slides.lockSwipeToNext(false);
	    this.slides.slideNext();
	    this.slides.lockSwipeToNext(true);
	}
}
