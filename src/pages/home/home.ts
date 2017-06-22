import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomyApi } from '../../shared/shared';
import { InvitePage } from '../../pages/pages';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
	lat: number;
  	lng: number;
  	zoom: number;
  	zoomControl:boolean;
  	streetViewControl:boolean;
  	compass:boolean;
  	myLocationButton:boolean;
  	indoorPicker:boolean;
	constructor(public navCtrl: NavController, public navParams: NavParams, private roomyApi: RoomyApi, public geolocation: Geolocation) {
	}

	ionViewDidLoad(){
		let self:any= this;
  		this.geolocation.getCurrentPosition().then((position) => { 
			self.lat=position.coords.latitude;
			self.lng=position.coords.longitude;
			self.zoom=17;
			self.zoomControl=false;
			self.streetViewControl=false;
			self.compass= true,
			self.myLocationButton= true, // GEOLOCATION BUTTON 
			self.indoorPicker= true
	  	}, (err) => {
	      console.log(err);
	    });
	}

	goToInviteFriends(){
		this.navCtrl.push(InvitePage);
	}
}
