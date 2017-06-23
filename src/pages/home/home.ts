import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';


import { RoomyApi } from '../../shared/shared';
import { InvitePage,MapPage } from '../../pages/pages';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	constructor(public navCtrl: NavController, public navParams: NavParams, private roomyApi: RoomyApi, private googleMaps: GoogleMaps) {
	}

	// Load map only after view is initialized
	ionViewDidLoad() {
	}
	goToInviteFriends(){
		this.navCtrl.push(InvitePage);
	}
}
