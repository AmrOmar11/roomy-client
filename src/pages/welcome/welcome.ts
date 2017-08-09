import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Subscription} from 'rxjs/Subscription';
/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  connected: Subscription;
  disconnected: Subscription;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, public network: Network) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  
  getStarted(){
  	this.navCtrl.setRoot('PreviewPage');
  }

  ionViewDidEnter() {
    this.connected = this.network.onConnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
   
    this.disconnected = this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }

  displayNetworkUpdate(connectionState: string){
    this.toastCtrl.create({
      message: `You are now ${connectionState}`,
      duration: 3000,
    }).present(); 
  }

  ionViewWillLeave(){
    this.connected.unsubscribe();
    this.disconnected.unsubscribe();
  }
}
