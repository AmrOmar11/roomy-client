import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation,PositionError } from '@ionic-native/geolocation';
import { AppAvailability } from '@ionic-native/app-availability';

/**
 * Generated class for the BookingConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google:any;
@IonicPage()
@Component({
  selector: 'page-booking-confirm',
  templateUrl: 'booking-confirm.html',
})
export class BookingConfirmPage {
  public userInfo:any;
  public location:any;
  public hotelphonenumber: any = "8143509343";
  constructor(public navCtrl: NavController, public navParams: NavParams,private appAvailability: AppAvailability, public platform:Platform, public geolocation:Geolocation) {
  	this.userInfo = this.navParams.get("userInfo"); 
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad BookingConfirmPage');
    // this.location = new google.maps.LatLng("17.4474257", "78.3609022");
     this.location = {latitude:"17.4474257",longitude:"78.3609022", name:"Hotel"}
  }

 
  startExternalMap() {
	  if (this.location.latitude) {
	      this.geolocation.getCurrentPosition().then((position) => {
			if (this.platform.is('ios')) {
			  this.appAvailability.check("comgooglemaps://")
			  .then(
			    (res) => window.open('maps://?q=' + this.location.name + '&saddr=' + position.coords.latitude + ',' + position.coords.longitude + '&daddr=' + this.location.latitude + ',' + this.location.longitude, '_system'),
			    (error) => window.open('https://www.google.co.in/maps/place/'+ position.coords.latitude + ',' + position.coords.longitude,'_system')
			  );
			} else if (this.platform.is('android')) {
			  this.appAvailability.check("com.google.android.apps.maps")
			  .then(
			    (res) => window.open('geo://' + position.coords.latitude + ',' + position.coords.longitude + '?q=' + this.location.latitude + ',' + this.location.longitude + '(' + this.location.name + ')', '_system'),
			    (error) => window.open('https://www.google.co.in/maps/place/'+ position.coords.latitude + ',' + position.coords.longitude,'_system')
			  );
			}else{
	        	window.open('https://www.google.co.in/maps/place/'+ position.coords.latitude + ',' + position.coords.longitude);
	        };

	      });
	  };
	}
}
