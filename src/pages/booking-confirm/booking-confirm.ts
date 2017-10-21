import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation,PositionError } from '@ionic-native/geolocation';
import { AuthenticateProvider,UserRequest } from '../../providers/authenticate/authenticate';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
  public bufferTime:any;
  public bufferTimeHours:any;
  public bufferTimeMinutes:any;
  public initialOffset:any;
  public hotelphonenumber: any = "8143509343";
  constructor(public navCtrl: NavController, public navParams: NavParams,private appAvailability: AppAvailability, public platform:Platform, public geolocation:Geolocation,private iab: InAppBrowser,private authProvider: AuthenticateProvider) {
  	this.userInfo = this.navParams.get("userInfo"); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingConfirmPage');
    // this.location = new google.maps.LatLng("17.4474257", "78.3609022");
    this.location = {latitude:"17.4474257",longitude:"78.3609022", name:"Hotel"}
    this.bufferTime = 60;
    this.calculateTimerText(this.bufferTime);
    var time = this.bufferTime;
	this.initialOffset = 440;
	var i = this.bufferTime;

	/* Need initial run as interval hasn't yet occured... */
	var timerParent = document.getElementById('circle_parent');
	timerParent.style.strokeDashoffset = this.initialOffset;
	var timer = document.getElementById('circle_animation');
	timer.style.strokeDashoffset = (this.initialOffset-(this.bufferTime*(this.initialOffset/time))).toString();
	var env = this;
	var interval = setInterval(function() {
		if (i == 1) {  	
	      clearInterval(interval);
				return;
	    }
	    console.log(i);
	    timer.style.strokeDashoffset = (env.initialOffset-((i-1)*(env.initialOffset/time))).toString();
	    i--;
	    if(env.bufferTimeMinutes > 0){
	    	env.bufferTimeMinutes--;
	    	if(env.bufferTimeMinutes < 10){
	    		env.bufferTimeMinutes = '0' +env.bufferTimeMinutes;
	    	}
	    }else{
	    	env.calculateTimerText(i);
	    }
	}, 60000);
  }

 
  startExternalMap() {
  	  let browserRef:any;
	  if (this.location.latitude) {
	      this.geolocation.getCurrentPosition().then((position) => {
			if (this.platform.is('ios')) {
			  this.appAvailability.check("comgooglemaps://")
			  .then(
			    (res) => {
			    	this.authProvider.showLoading();
			    	browserRef = window.open('maps://?q=' + this.location.name + '&saddr=' + position.coords.latitude + ',' + position.coords.longitude + '&daddr=' + this.location.latitude + ',' + this.location.longitude, '_system')
			    },
			    // (error) => {
			    // 	this.appAvailability.check("com.apple.ios.apps.maps")
			    // 	.then(
			    // 		(res)=>{window.open('http://maps.apple.com/?sll='+position.coords.latitude+','+position.coords.longitude+'&z=10&t=s','_system');},
	    		(error)=>{
	    			this.authProvider.showLoading();
	    			browserRef = this.iab.create('https://www.google.co.in/maps/place/'+ position.coords.latitude + ',' + position.coords.longitude,'_system')
		    	}
			    //	)}
			  );
			} else if (this.platform.is('android')) {
			  this.appAvailability.check("com.google.android.apps.maps")
			  .then(
			    (res) => {
			    	this.authProvider.showLoading();
			    	browserRef = window.open('geo://' + position.coords.latitude + ',' + position.coords.longitude + '?q=' + this.location.latitude + ',' + this.location.longitude + '(' + this.location.name + ')', '_system')
			    },
			    (error) => {
			    	this.authProvider.showLoading();
			    	browserRef = this.iab.create('https://www.google.co.in/maps/place/'+ position.coords.latitude + ',' + position.coords.longitude,'_system')
			    }
			  );
			}else{
				this.authProvider.showLoading();
	        	browserRef = this.iab.create('https://www.google.co.in/maps/place/'+ position.coords.latitude + ',' + position.coords.longitude,'_system');
	        };

	        if (this.platform.is('cordova')) {
		        browserRef.on("loadstart").subscribe((event) => {
		        	this.authProvider.hideLoading();
	        		console.log(event);
	        	});
	        }
	      	});
	  };
	}

	calculateTimerText(bufferTime){
		if(bufferTime >59){
			this.bufferTimeMinutes = (bufferTime%60);
			this.bufferTimeHours = Math.floor(bufferTime/60);
			if(this.bufferTimeHours < 10){
				this.bufferTimeHours = '0'+this.bufferTimeHours;
			}
			if(this.bufferTimeMinutes < 10){
				this.bufferTimeMinutes = '0'+this.bufferTimeMinutes;
			}
		}else{
			this.bufferTimeMinutes = bufferTime;
			this.bufferTimeHours = 0;
		}
	}
}
