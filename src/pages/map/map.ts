import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 declare var google:any;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, public geolocation: Geolocation) {
  	this.loadMap();
  }

  loadMap(){
  let options = {timeout: 10000, enableHighAccuracy: true};
    //ENABLE THE FOLLOWING:
    
    this.geolocation.getCurrentPosition(options).then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        zoomControl:false,
        fullscreenControl:false,
		streetViewControl:false,
		compass:true,
		myLocationButton: true, // GEOLOCATION BUTTON 
		indoorPicker: true
      }

      let map = new google.maps.Map(document.querySelector('#map'), mapOptions);
    });
  }

}
