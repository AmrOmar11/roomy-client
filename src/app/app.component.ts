import { Component} from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { AuthenticateProvider,UserRequest } from '../providers/authenticate/authenticate';
// import { OneSignal } from '@ionic-native/onesignal';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html'
})
export class RoomyApp {  
  rootPage: any;
  isOnline:boolean = false;
  connectionStatus = "";
  constructor(public platform: Platform, 
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private nativeStorage: NativeStorage, 
    public authProvider: AuthenticateProvider,
    public keyboard:Keyboard,
    public network: Network,/*
    public oneSignal: OneSignal*/) {
      this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.keyboard.disableScroll(true);
      this.loginFromNativeStorage();
      this.checkNetwork();
      if(this.network.type=='none' || this.network.type== null){
        this.connectionStatus = 'Oops! Sorry your are not connected to Internet.';
        let env = this;
        setTimeout(function(){
          env.displayNetworkUpdate(env.connectionStatus,0, "toast-custom-changes-error")
        },3000);       
      }else{
       this.isOnline = true; 
      }
      // this.startOnesignal();
    });
  }

  loginFromNativeStorage(){
    if(this.platform.is('cordova')){
      this.nativeStorage.getItem('userdata')
      .then(data => {
          //console.log(data);
          let inputData:UserRequest = new UserRequest();
          inputData.action = "SIGNIN";
          inputData.loginType = "TOKEN";
          inputData.customerToken = data.customerToken;
          this.authProvider.login(inputData).subscribe(success => {
          if((success.status !== undefined)&&(success.status == '0001')) {
              this.authProvider.setCurrentUser(success);
              this.authProvider.setUserData(success);
              this.rootPage = 'HomePage';
            } else {
              this.rootPage = 'PreviewPage';
            }
          },
          error => {
            //console.log(error);
            this.rootPage = 'PreviewPage';
          });
        },
        error => {
          //console.log(error);
          this.rootPage = 'PreviewPage';
        }
      );
    }else{
      this.rootPage = 'PreviewPage';
    }
  }

  displayNetworkUpdate(connectionState: string, toastduration:number, customClass: string){
      let networkStatus = document.getElementById("network-status");
      let networkStatusText = document.getElementById("network-status-txt");
      networkStatusText.innerHTML = connectionState;
      networkStatus.setAttribute('class',customClass);
      networkStatus.style.display='block';
      if(toastduration > 0){
        setTimeout(function(){
          networkStatus.style.display='none';
        },toastduration);
      }
  }

  checkNetwork(){
        let env = this;
        // this.network.onchange().subscribe(env.connHandler.bind(env));
        this.network.onConnect().subscribe(env.connHandler.bind(env));
        this.network.onDisconnect().subscribe(env.connHandler.bind(env));
        
        this.platform.pause.subscribe(()=>{
          console.log('*******APP IS IN BACKGROUND*******');
        });

        this.platform.resume.subscribe(()=>{
          console.log('******APP IS IN FOREGROUND*******');
          if(this.isOnline == false){
            this.connectionStatus = "Oops! Your are not connected to Internet."
            this.displayNetworkUpdate(this.connectionStatus, 0, "toast-custom-changes-error");
          }
        });
  }

  connHandler(data){
    if(data.type == 'online') {
      this.isOnline = true;
      this.connectionStatus = "Great! You are now connected to Internet.";
      this.displayNetworkUpdate(this.connectionStatus,2000,"toast-custom-changes-noerror");      
    }
    else {
      this.isOnline = false
      this.connectionStatus = "Oops! Your are not connected to Internet."
      this.displayNetworkUpdate(this.connectionStatus,0, "toast-custom-changes-error");
    }
  }

  hideNetworkStatus(){
    let networkStatus = document.getElementById("network-status");
      networkStatus.style.display='none';
  }

  // startOnesignal(){
  //   if (this.platform.is('cordova')){
  //     this.oneSignal.startInit('1ae97439-f217-446d-9ae5-8fefcfb36ed7', '17668287249');

  //     this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

  //     this.oneSignal.handleNotificationReceived().subscribe(() => {
  //      // do something when notification is received
  //       // alert("recevied");
  //     });

  //     this.oneSignal.handleNotificationOpened().subscribe(() => {
  //       // do something when a notification is opened
  //       // alert("opened");
  //     });
  //     this.oneSignal.endInit();
  //   }
  // }

}
