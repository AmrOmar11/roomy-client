import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RoomyApi } from '../../shared/shared';
import { InvitePage } from '../../pages/pages';

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
	constructor(public navCtrl: NavController, public navParams: NavParams, private roomyApi: RoomyApi) {
	}

	// Load map only after view is initialized
	ionViewDidLoad() {
	}
	goToInviteFriends(){
		this.navCtrl.push(InvitePage);
	}
}
