import { Component,OnInit } from '@angular/core';
import { IonicPage,NavController,NavParams,ModalController} from 'ionic-angular';
import { Geolocation,Geoposition } from '@ionic-native/geolocation';
import { SearchPage } from '../search/search';
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
export class MapPage implements OnInit{

	private map:any;
	private userLocation:any;
	private sourceMarker:any;
	private address:any = {
        place: '',
        set: false,
    };
    private placesService:any;
    private directionsService:any;
    private directionsDisplay:any;
    private destinationLocation:any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public geolocation: Geolocation,
		public modalCtrl: ModalController) {
	}

	ngOnInit() {
       console.log('ngOnInit');
       this.getCurrenLocation();
    }

	ngAfterViewInit() {
		console.log('ngAfterViewInit');
	}
  
	private getCurrenLocation(){
		let options = {enableHighAccuracy: true};
		this.geolocation.getCurrentPosition(options).then((res) => {
			console.log(res);
			this.loadMap(res);
		})
		.catch((error) =>{
			console.log(error);
		});
	}
  
  	private loadMap(position: Geoposition){
		this.userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		let mapOptions = {
			center: this.userLocation,
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
		google.maps.event.addListenerOnce(this.map,'tilesloaded',this.mapLoaded.bind(this,this.userLocation));
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(this.map);
	}

	private mapLoaded(location){
		this.addSourceMarker(true,location);
	}
	
	// Adds a marker to the map.
	private addSourceMarker(animate:boolean,location){
        if(this.sourceMarker !== undefined){
            this.sourceMarker.setMap(null);
        }        
		let animationType:any = null;
		if(animate == true){
			animationType = google.maps.Animation.DROP;
		}
		this.sourceMarker = new google.maps.Marker({
			position: location,
			map: this.map,
			animation: animationType,
			title: 'Drage me!',
			draggable:true
		});
        google.maps.event.addListener(this.sourceMarker,'dragend',this.sourceMarkerDragEnd.bind(this));
    }
	
	private sourceMarkerDragEnd(event){
	    console.log('Marker:DragEnd:lat:'+event.latLng.lat()+' lng:'+event.latLng.lng());
        this.userLocation = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
        this.map.panTo(this.userLocation);
	}
	
	private compasClicked(){
        if (this.map !== undefined) {
			// this.addMarker(false,this.location);
            let options = {enableHighAccuracy: true};
            this.geolocation.getCurrentPosition(options).then((res) => {
                console.log(res);
                this.userLocation = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
                this.map.panTo(this.userLocation);
                this.addSourceMarker(false,this.userLocation);
            })
            .catch((error) =>{
                console.log(error);
            });
		}
	}
	
	private searchClicked(){
        // reset 
        this.resetSearch();
        // show modal
        let modal = this.modalCtrl.create(SearchPage);
        modal.onDidDismiss(data => {
            console.log('search > modal dismissed > data > ', data);
            if(data){
                this.address.place = data.description;
                // get details
                this.getPlaceDetail(data.place_id);
            }                
        })
        modal.present();
    }

    private resetSearch() {
        this.address.place = '';
        this.address.set = false;
    }

    private getPlaceDetail(place_id:string):void {
        var self = this;
        var request = {
            placeId: place_id
        };
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.placesService.getDetails(request, callback);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('page > getPlaceDetail > place > ', place);
                // set place in map
                self.userLocation = place.geometry.location;
                self.map.panTo(place.geometry.location);
                self.addSourceMarker(false,place.geometry.location);
                // self.displayRoute(place.geometry.location,self.destinationLocation,self.directionsService,self.directionsDisplay);
                // populate
                self.address.set = true;
            }else{
                console.log('page > getPlaceDetail > status > ', status);
            }
        }
    }
    
    private displayRoute(origin, destination, service, display) {
        service.route({
          origin: origin,
          destination: destination,
          // waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
          travelMode: 'DRIVING',
          avoidTolls: false
        }, function(response, status) {
          if (status === 'OK') {
            // console.log(response);
             display.setDirections(response);
          } else {
            console.log('Could not display directions due to: ' + status);
          }
        });
    }

    public displayDirection(Lat,Lng){
        if(this.sourceMarker !== undefined){
            this.sourceMarker.setMap(null);
        }
        this.destinationLocation = new google.maps.LatLng(Lat, Lng);
        this.displayRoute(this.userLocation,this.destinationLocation,this.directionsService,this.directionsDisplay);
        // this.addMarker(true,this.userLocation,this.getDirections(location));
    }
}
