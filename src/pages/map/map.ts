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
	private location:any;
	private marker:any;
	private address:any = {
        place: '',
        set: false,
    };
    private placesService:any;
    private directionsService:any;
    private directionsDisplay:any;
    private destination:any;

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
		google.maps.event.addListenerOnce(this.map,'tilesloaded',this.mapLoaded.bind(this,this.location));
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(this.map);
	}

	private mapLoaded(location){
		// this.addMarker(true,location);
        this.destination = new google.maps.LatLng(17.4574212025986, 78.3720215372955);
        this.displayRoute(location,this.destination,this.directionsService,this.directionsDisplay);
	}
	
	// Adds a marker to the map.
	private addMarker(animate:boolean,location){
        if(this.marker !== undefined){
            this.marker.setMap(null);
        }        
		let animationType:any = null;
		if(animate == true){
			animationType = google.maps.Animation.DROP;
		}
		this.marker = new google.maps.Marker({
			position: location,
			map: this.map,
			animation: animationType,
			title: 'Drage me!',
			draggable:true
		});
		google.maps.event.addListener(this.marker,'dragend',this.markerDragEnd.bind(this));        
	}
	
	private markerDragEnd(event){
	    console.log('DragEnd:lat:'+event.latLng.lat()+' lng:'+event.latLng.lng());
        let newLocation = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
        this.map.panTo(newLocation);
	}
	
	private compasClicked(){
		if ((this.map !== undefined)&&(this.location !== undefined)) {
			this.map.panTo(this.location);
			// this.addMarker(false,this.location);
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
                self.map.panTo(place.geometry.location);
                // self.addMarker(false,place.geometry.location);
                self.displayRoute(place.geometry.location,self.destination,self.directionsService,self.directionsDisplay);
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
}
