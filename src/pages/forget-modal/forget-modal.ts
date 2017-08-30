import { Component,Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
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
    constructor( public viewCtrl: ViewController,  
                  public renderer: Renderer,
                  private alertCtrl: AlertController,
                  private authProvider: AuthenticateProvider) {
        this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'Forget-Model', true);
        console.log("Added model");

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
    reset(){
        this.viewCtrl.dismiss();
        let confirm = this.alertCtrl.create({
            message: "Please enter OTP sent to Email / Mobile",
            inputs: [
                {
                    name: 'otp',
                    placeholder: '6 Digit OTP'
                }],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'            
                },
                {
                    text: 'Reset',
                    handler: () => {
                        console.log('Reset redirect');
                    }
                }
            ]
        });
        confirm.present();
    }

}
