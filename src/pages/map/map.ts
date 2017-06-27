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
	address:any = {
        place: '',
        set: false,
    };
    placesService:any;
    placedetails: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public geolocation: Geolocation,
		public modalCtrl: ModalController) {
	}

	ngOnInit() {
       console.log('ngOnInit');
       this.loadCurrenLocation();
       this.initPlacedetails();
    }

	ngAfterViewInit() {
		console.log('ngAfterViewInit');
	}
  
	private loadCurrenLocation(){
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
	}

	private mapLoaded(location){
		this.addMarker(true,location);		
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
			this.addMarker(false,this.location);
		}
	}
	
	private searchClicked(){
        this.showModal();
	}
	
	showModal() {
        // reset 
        this.reset();
        // show modal|
        let modal = this.modalCtrl.create(SearchPage);
        modal.onDidDismiss(data => {
            console.log('page > modal dismissed > data > ', data);
            if(data){
                this.address.place = data.description;
                // get details
                this.getPlaceDetail(data.place_id);
            }                
        })
        modal.present();
    }

    private reset() {
        this.initPlacedetails();
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
                // set full address
                self.placedetails.address = place.formatted_address;
                self.placedetails.lat = place.geometry.location.lat();
                self.placedetails.lng = place.geometry.location.lng();
                for (var i = 0; i < place.address_components.length; i++) {
                    let addressType = place.address_components[i].types[0];
                    let values = {
                        short_name: place.address_components[i]['short_name'],
                        long_name: place.address_components[i]['long_name']
                    }
                    if(self.placedetails.components[addressType]) {
                        self.placedetails.components[addressType].set = true;
                        self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
                        self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
                    }
                }
                // set place in map
                self.map.panTo(place.geometry.location);
                self.addMarker(false,place.geometry.location);
                // populate
                self.address.set = true;
                console.log('page > getPlaceDetail > details > ', self.placedetails);
            }else{
                console.log('page > getPlaceDetail > status > ', status);
            }
        }
    }

	private initPlacedetails() {
        this.placedetails = {
            address: '',
            lat: '',
            lng: '',
            components: {
                route: { set: false, short:'', long:'' },                           // calle 
                street_number: { set: false, short:'', long:'' },                   // numero
                sublocality_level_1: { set: false, short:'', long:'' },             // barrio
                locality: { set: false, short:'', long:'' },                        // localidad, ciudad
                administrative_area_level_2: { set: false, short:'', long:'' },     // zona/comuna/partido 
                administrative_area_level_1: { set: false, short:'', long:'' },     // estado/provincia 
                country: { set: false, short:'', long:'' },                         // pais
                postal_code: { set: false, short:'', long:'' },                     // codigo postal
                postal_code_suffix: { set: false, short:'', long:'' },              // codigo postal - sufijo
            }    
        };        
    }
}
