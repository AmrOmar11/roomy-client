import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';
import { AuthenticateProvider} from '../../providers/authenticate/authenticate';
import { SocialSharing } from '@ionic-native/social-sharing';
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
	message:string;
	url:string;

	constructor(public navCtrl: NavController,
        public authProvider: AuthenticateProvider,
        private socialSharing: SocialSharing) {
		this.userInfo = this.authProvider.getUserInfo();
		this.message = 'Hi Subscribe in Pobyt get 20 minutes stay for free';
		this.url = 'https://pobyt.co';
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad InvitePage');
	}

	shareSheet(){
		// Opens up the share sheet so you can share using the app you like the most.
		// share(message, subject, file, url)
		this.socialSharing.share(this.message,'Pobyt',null,this.url).then(() => {
			// Success!
		}).catch(() => {
			// Error!
		});
	}
}
