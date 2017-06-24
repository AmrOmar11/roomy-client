import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation,Geoposition } from '@ionic-native/geolocation';

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

  private map:any;
  
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams, 
  	public geolocation: Geolocation) {
  	
  }
  
  ngAfterViewInit() {
  	this.loadCurrenLocation();
  }
  
  loadCurrenLocation(){
	let options = {timeout: 10000, enableHighAccuracy: true};
	//ENABLE THE FOLLOWING:
	this.geolocation.getCurrentPosition(options).then((res) => {
	  console.log(res);
	  this.loadMap(res);
	})
	.catch((error) =>{
	  console.log(error);
	});
  }
  
  loadMap(position: Geoposition){
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
		this.map = new google.maps.Map(document.querySelector('#map'), mapOptions);
		var marker = new google.maps.Marker({
			position: latLng,
			map: this.map,
			animation: google.maps.Animation.DROP,
			title: 'Click to zoom'
		});
  	}
}
