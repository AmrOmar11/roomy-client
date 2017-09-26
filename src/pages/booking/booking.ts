import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticateProvider, UserRequest } from '../../providers/authenticate/authenticate';
/**
 * Generated class for the BookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-booking',
    templateUrl: 'booking.html',
})
export class BookingPage {
    userInfo:any;
    hotelInfo:any;
    bookForUser:boolean = true;
    bookForOther:boolean = true;
    signUpForm:FormGroup;
    signUpData:UserRequest;
    constructor(public navCtrl: NavController, 
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        private authProvider: AuthenticateProvider) {
        this.signUpData = new UserRequest();
        let bookingFor = this.navParams.get("for");
        this.hotelInfo = this.navParams.get("hotelInfo");
        if(bookingFor == 'me'){
          this.bookForUser = false;
        }else if(bookingFor == 'other'){
          this.bookForOther = false;
        }
        this.userInfo = this.authProvider.getUserInfo();
        this.signUpForm = this.formBuilder.group({
            firstName: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]+'), Validators.required]),''],
            contactNumber: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]+'), Validators.required]),''],
            emailId: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.required]),'']           
        });    
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BookingPage');
    };
    openTerms() {
        this.navCtrl.push('PoliciesPage');
    }
    confirmbooking(){
        this.navCtrl.push('BookingConfirmPage',{"userInfo":this.userInfo} );
    }
}