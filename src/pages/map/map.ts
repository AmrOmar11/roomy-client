import { Component,OnInit } from '@angular/core';
import { IonicPage,ModalController,AlertController} from 'ionic-angular';
import { Geolocation,PositionError } from '@ionic-native/geolocation';
import { AuthenticateProvider } from '../../providers/authenticate/authenticate';
import { Events } from 'ionic-angular';
import { SearchPage } from '../pages';
import { Diagnostic } from '@ionic-native/diagnostic';
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
  private zoomLevel:any = 5;
  private locationMarker:any;
  private hotelMarkers = [];
  private selectedHotelMarkers = [];
  private placesService:any;
  private loading:any;
  private usersearchitem:any= "Nearby - Available now";
  private icons:any = { 
    userloc: {
      url: "assets/map/position_marker.png", // url
      scaledSize: new google.maps.Size(32, 32), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    },
    hotel:{
      url: "assets/map/hotel_marker.png", // url
      scaledSize: new google.maps.Size(26, 26), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    },
    selectedHotel:{
      url: "assets/map/selected_hotel_marker.png", // url
      scaledSize: new google.maps.Size(32, 32), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    }
  }; 

	constructor(
		public geolocation: Geolocation,
		public modalCtrl: ModalController,
    public authProvider: AuthenticateProvider,
    public events: Events,
    private diagnostic: Diagnostic,
    private alertCtrl: AlertController) {
	}

	ngOnInit() {
    //console.log('map:ngOnInit');
    this.loading = document.getElementById("loaderoverlay");
    this.loading.style.display="block";
    this.events.subscribe('hotel:slideChanged',(currentIndex) => {
      for(let i = 0; i < this.selectedHotelMarkers.length; i++){
        if(i == currentIndex){
            this.hotelMarkers[i].setVisible(false);
            this.selectedHotelMarkers[i].setVisible(true);
            // this.selectedHotelMarkers[i].setAnimation(google.maps.Animation.BOUNCE);
        }else{
          this.selectedHotelMarkers[i].setVisible(false);
          this.hotelMarkers[i].setVisible(true);
        }
      }
      // this.map.setZoom(this.zoomLevel);
      // this.map.panTo(this.selectedHotelMarkers[currentIndex].getPosition());
    });
    this.events.subscribe('map:resize',() => {
        //console.log('map:resize:');
        if(this.map !== undefined){
            google.maps.event.trigger(this.map, 'resize');
        }        
    });
    this.loadMap();
  }

	ngAfterViewInit() {
	}
  
  private isLocationEnabled(){
    this.diagnostic.isLocationEnabled().then((available)=>{
      if(available){
        this.getCurrenLocation();
      }else{
        this.isLocationAuthorized();
      }
    })
    .catch((error) =>{
    });
  }

  private isLocationAuthorized(){
    this.diagnostic.isLocationAuthorized().then((authorized)=>{
      if(authorized){
        this.getCurrenLocation();
      }else{
        this.requestLocationAuthorization();
      }
    })
    .catch((error) =>{
    });
  }

  private requestLocationAuthorization(){
     this.diagnostic.requestLocationAuthorization().then((status)=>{
      let granted = false;
      switch(status){
        case this.diagnostic.permissionStatus.NOT_REQUESTED:
            console.log("Permission not requested");
            break;
        case this.diagnostic.permissionStatus.DENIED:
            console.log("Permission denied");
            break;
        case this.diagnostic.permissionStatus.GRANTED:
            console.log("Permission granted always");
            granted = true;
            break;
        case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
            console.log("Permission granted only when in use");
            granted = true;
            break;
        case this.diagnostic.permissionStatus.DENIED_ALWAYS:
            console.log("Permission granted only when in use");
            break;
      }
      if(granted){
        this.getCurrenLocation();
      }else{
         this.authProvider.showError('Allow "Pobyt" to access your location while you use the app');
      }
    })
    .catch((error) =>{

    }); 
  }
  private openSettings(){
    this.diagnostic.switchToSettings().then((res) =>{
       this.getCurrenLocation();
    })
    .catch((error) =>{
    });
  }

  private showError(text) {
    let alert = this.alertCtrl.create({
        title: ':( Oops!',
        message: text,
        buttons: [
            {
                text: 'Allow',
                handler: data => {
                  // user has clicked the alert button
                  // begin the alert's dismiss transition
                  const navTransition = alert.dismiss();
                  navTransition.then(() => {
                   this.openSettings();
                  });
                  return false;
                }
            }
        ]
    });
    alert.present(prompt);
  }

	private getCurrenLocation(){
		let options = {enableHighAccuracy: true};
		this.geolocation.getCurrentPosition(options).then((res) => {
			// console.log(res);
			this.userLocation = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
			this.addLocationMarker(this.userLocation);
			this.clearHotelMarkers();
			this.fetchHotels(this.userLocation);
		})
		.catch((error:PositionError) =>{
			// console.log(error);
	      if(error.code ==1){
	        this.showError('Allow "Pobyt" to access your location while you use the app');
	      }
		});
	}
  
  private loadMap(){
    this.userLocation = new google.maps.LatLng('20.5937','78.9629');
    let mapStyles =[
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#d7e8e8"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#a8de87"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#c2d1d6"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c2d1d6"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#7d7d7d"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ];
    let mapOptions = {
      center: this.userLocation,
      zoom: this.zoomLevel,
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
    google.maps.event.addListenerOnce(this.map,'tilesloaded',this.mapLoaded.bind(this));
	}

	private mapLoaded(){
      this.loading.style.display="none";
      this.getCurrenLocation();
	}

  private fetchHotels(location){
    let inputData = {
      user_Latitude:location.lat(),
      user_Longitude:location.lng(),
      customerToken : this.authProvider.getUserInfo().customerToken,
      userId : this.authProvider.getUserInfo().userID
    };
    this.authProvider.getHotels(inputData).subscribe(data => {
      this.clearHotelMarkers();
      this.addHotelMarkers(data);
    });
  }

  private addHotelMarkers(data){
    let hotels = [];
    if(data.status !== undefined && data.status == '0001'){
        hotels = data.result;
    }
    if(hotels !== undefined && hotels.length !== 0){
     let bounds = new google.maps.LatLngBounds();
     for (var i = 0; i < hotels.length; i++) {
        let location = new google.maps.LatLng(hotels[i].latitude, hotels[i].longitude);
        let hotelMarker = new google.maps.Marker({
          position: location,
          map: this.map,
          icon:this.icons.hotel,
          visible: true,
          clickable: true
        });
        this.hotelMarkers.push(hotelMarker);
        bounds.extend(hotelMarker.position);
        let selectedHotelMarker = new google.maps.Marker({
          position: location,
          map: this.map,
          icon:this.icons.selectedHotel,
          visible: true,
          clickable: true
        });
        this.selectedHotelMarkers.push(selectedHotelMarker);
        hotels[i].distance = this.distanceInKm(this.userLocation.lat(),this.userLocation.lng(),hotels[i].latitude,hotels[i].longitude);
        google.maps.event.addListener(this.hotelMarkers[i], 'click', (marker) => {
          for (var j = 0; j < hotels.length; j++) {
            if((hotels[j].latitude == marker.latLng.lat())){
                this.events.publish('hotel:marker',j);
                //this.map.setZoom(13);
                //this.map.panTo(this.hotelMarkers[j].getPosition());
               break;
            }
          }
        });
        google.maps.event.addListener(this.selectedHotelMarkers[i], 'click', (marker) => {
          for (var k = 0; k < hotels.length; k++) {
            if((hotels[k].latitude == marker.latLng.lat())){
                this.events.publish('hotel:marker',k);
                //this.map.setZoom(13);
                //this.map.panTo(this.selectedHotelMarkers[k].getPosition());
               break; 
            }
          }
        });
      }
      this.map.fitBounds(bounds);
    }else{
      this.map.panTo(this.userLocation);
    }
    this.events.publish('hotels:list',hotels);
  }

  private clearHotelMarkers() {
    for (var i = 0; i < this.hotelMarkers.length; i++) {
      this.hotelMarkers[i].setMap(null);
    }
    for (var j = 0; j < this.selectedHotelMarkers.length; j++) {
      this.selectedHotelMarkers[j].setMap(null);
    }
    this.hotelMarkers = [];
    this.selectedHotelMarkers = [];
  }
	
	private addLocationMarker(location){
    if(this.locationMarker !== undefined){
        this.locationMarker.setPosition(location);
    }else{
      this.locationMarker = new google.maps.Marker({
        position: location,
        map: this.map,
        icon:this.icons.userloc,
        optimized: false
      });
    }
  }
	
	compasClicked(){
    this.getCurrenLocation();
	}
	
	searchClicked(){
    // show modal
    let modal = this.modalCtrl.create(SearchPage);
    modal.onDidDismiss(data => {
        //console.log('search > modal dismissed > data > ', data);
        if(data){
            // get details
            let place_id = data.place_id;
            this.getPlaceDetail(data.place_id);
        }
    })
    modal.present();
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
              //console.log('page > getPlaceDetail > place > ', place);
              // set place in map
              self.userLocation = place.geometry.location;
              self.usersearchitem = place.name;
              self.addLocationMarker(self.userLocation);
              self.clearHotelMarkers();
              self.fetchHotels(self.userLocation);
          }else{
              //console.log('page > getPlaceDetail > status > ', status);
          }
      }
  }

  private distanceInKm(userLatitude,userLongitude,hotelLatitude,hotelLongitude) {
    //console.log('userLatitude:',userLatitude,'userLongitude:',userLongitude);
    //console.log('hotelLatitude:',hotelLatitude,'hotelLongitude:',hotelLongitude);
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(hotelLatitude-userLatitude);  // deg2rad below
    var dLon = this.deg2rad(hotelLongitude-userLongitude); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(userLatitude)) * Math.cos(this.deg2rad(hotelLatitude)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    let distance:any;      
    if((d%1) > 0)
        distance = d.toFixed(2) + " Km";
    else
        distance = d + " Km";
    return distance;
  }
  
  private deg2rad(deg) {
      return deg * (Math.PI/180)
  }
}
