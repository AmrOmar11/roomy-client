import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';
import { AuthenticateProvider} from '../../providers/authenticate/authenticate';
/**
 * Generated class for the InvitePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html',
})
export class InvitePage {
	userInfo:any;
	
	constructor(public navCtrl: NavController,
        public authProvider: AuthenticateProvider) {
		this.userInfo = this.authProvider.getUserInfo();
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad InvitePage');
	}
}
