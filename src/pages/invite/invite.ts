import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitePage');
  }

  /**
   * Opens up the share sheet so you can share using the app you like the most.
   */
  regularShare(){
    // share(message, subject, file, url)
    this.socialSharing.share("Testing, sharing this from inside an app I'm building right now", null, null, null); 
  }

}
