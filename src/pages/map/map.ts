import { Component,OnInit } from '@angular/core';
import { IonicPage,ModalController} from 'ionic-angular';
import { Geolocation,Geoposition } from '@ionic-native/geolocation';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Events } from 'ionic-angular';
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
  private hotelMarkers = [];
  private selectedHotelMarkers = [];
  private address:any = {
      place: '',
      set: false,
  };
  private placesService:any;
  public loading:any;
  public icons:any = { 
    userloc: {
      url: "http://w2.marketeer.co/img/bluedot.png", // url
      scaledSize: new google.maps.Size(61, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    },
    hotel:{
      url: "assets/img/hotel_marker.png", // url
      scaledSize: new google.maps.Size(25, 25), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    },
    selectedHotel:{
      url: "assets/img/selected_hotel_marker.png", // url
      scaledSize: new google.maps.Size(25, 25), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    }
  }; 

	constructor(
		public geolocation: Geolocation,
		public modalCtrl: ModalController,
    public authProvider: AuthenticateProvider,
    public events: Events) {
	}

	ngOnInit() {
    console.log('map:ngOnInit');
    this.loading = document.getElementById("loaderoverlay");
    this.loading.style.display="block";
    this.getCurrenLocation();
    this.events.subscribe('hotel:slideChanged',(currentIndex) => {
      console.log('hotelSlideChanged:', currentIndex);
      if(currentIndex != undefined){        
        for (var i = 0; i < this.hotelMarkers.length; i++) {
          if(currentIndex == i){
            this.hotelMarkers[i].setMap(null);
          }else{
            this.hotelMarkers[i].setMap(null);
            this.selectedHotelMarkers[currentIndex].setMap(this.map);
          }          
        }        
      }
    });
  }

	ngAfterViewInit() {
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
    let mapStyles =[
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }      
    ];
    let mapOptions = {
      center: this.userLocation,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl:false,
      fullscreenControl:false,
      streetViewControl:false,
      compass:true,
      myLocationButton: true, // GEOLOCATION BUTTON 
      indoorPicker: true,
      styles: mapStyles
    }
    this.map = new google.maps.Map(document.querySelector('#map'), mapOptions);
    google.maps.event.addListenerOnce(this.map,'tilesloaded',this.mapLoaded.bind(this,this.userLocation));
	}

	private mapLoaded(location){
      this.addSourceMarker(true,location);
      this.fetchHotels(location);
	}

  private fetchHotels(location){
    let inputData = {
      user_Latitude:location.lat(),
      user_Longitude:location.lng(),
      customerToken : this.authProvider.getUserInfo().customerToken
    };
    this.authProvider.getHotels(inputData).subscribe(data => {
      this.events.publish('hotels:list', data.result,this.userLocation);
      this.clearHotelMarkers();
      this.addHotelMarkers(data.result);
      this.loading.style.display="none";
    });
  }

  private addHotelMarkers(hotelsInfo){
    if(hotelsInfo !== undefined && hotelsInfo.length !== 0){
     for(let hotel of hotelsInfo) {
        let location = new google.maps.LatLng(hotel.latitude, hotel.longitude);
        let hotelMarker = new google.maps.Marker({
          position: location,
          map: this.map,
          icon:this.icons.hotel
        });
        this.hotelMarkers.push(hotelMarker);
        let selectedHotelMarker = new google.maps.Marker({
          position: location,
          map: this.map,
          icon:this.icons.selectedHotel
        });
        this.selectedHotelMarkers.push(selectedHotelMarker);
        selectedHotelMarker.setMap(null);
      }
    }
  }

  private clearHotelMarkers() {
    for (var i = 0; i < this.hotelMarkers.length; i++) {
      this.hotelMarkers[i].setMap(null);
    }
    for (var i = 0; i < this.selectedHotelMarkers.length; i++) {
      this.selectedHotelMarkers[i].setMap(null);
    }
    this.hotelMarkers = [];
    this.selectedHotelMarkers = [];
  }
	
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
    	// title: 'Drage me!',
    	// draggable:true,
    	icon:this.icons.userloc
    });
  }
	
	compasClicked(){
    if (this.map !== undefined) {
      let options = {enableHighAccuracy: true};
      this.geolocation.getCurrentPosition(options).then((res) => {
          console.log(res);
          this.userLocation = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
          this.map.panTo(this.userLocation);
          this.addSourceMarker(false,this.userLocation);
          this.fetchHotels(this.userLocation);
      })
      .catch((error) =>{
          console.log(error);
      });
    }
	}
	
	searchClicked(){
      // reset 
      this.resetSearch();
      // show modal
      let modal = this.modalCtrl.create('SearchPage');
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
                self.address.set = true;
                self.fetchHotels(self.userLocation);
            }else{
                console.log('page > getPlaceDetail > status > ', status);
            }
        }
    }
}
