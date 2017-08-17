import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the ForgetModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-forget-modal',
    templateUrl: 'forget-modal.html',
})
export class ForgetModalPage {
    constructor(
    public viewCtrl: ViewController
    ) {
        console.log("Added model")
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
