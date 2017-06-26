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
	private location:any;
	private marker:any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public geolocation: Geolocation) {
	}

	ngAfterViewInit() {
		this.loadCurrenLocation();
	}
  
	loadCurrenLocation(){
		let options = {enableHighAccuracy: true};
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
		this.location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		let mapOptions = {
			center: this.location,
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
		google.maps.event.addListenerOnce(this.map,'tilesloaded',this.mapLoaded.bind(this));
	}

	mapLoaded(){
		this.addMarker(true);		
	}
	
	// Adds a marker to the map.
	addMarker(animate:boolean){
		let animationType:any = null;
		if(animate == true){
			animationType = google.maps.Animation.DROP;
		}
		this.marker = new google.maps.Marker({
			position: this.location,
			map: this.map,
			animation: animationType,
			title: 'Drage me!',
			draggable:true
		});
		google.maps.event.addListener(this.marker,'dragend',function(event) {
	        console.log('DragEnd:lat:'+event.latLng.lat()+' lng:'+event.latLng.lng());
	        let newLocation = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
	        this.map.setCenter(newLocation);
    	});
	}
	
	compasClicked(){
		if(this.marker !== undefined){
			this.marker.setMap(null);	
		}
		if ((this.map !== undefined)&&(this.location !== undefined)) {
			this.map.setCenter(this.location);
			this.addMarker(false);
		}
	}

}
