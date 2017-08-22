import { Component,Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController  } from 'ionic-angular';

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

  constructor(public viewCtrl: ViewController,  
                  public renderer: Renderer,
                  private alertCtrl: AlertController) {
          this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'invite-Model', true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitePage');
  }

}
