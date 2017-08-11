import { Component,OnInit } from '@angular/core';
import { IonicPage,NavController,NavParams,ModalController, LoadingController} from 'ionic-angular';
import { Geolocation,Geoposition } from '@ionic-native/geolocation';
import { HotelsProvider } from '../../providers/hotels/hotels';
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
    public hotelsInfo:any;
    private placesService:any;
    private directionsService:any;
    private directionsDisplay:any;
    private destinationLocation:any;
    public loading:any;
    public icons:any = { 
          userloc: {
            url: "http://w2.marketeer.co/img/bluedot.png", // url
            scaledSize: new google.maps.Size(61, 50), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
          },
          hotel:{
            url: "../assets/img/hotel_marker.png", // url
            scaledSize: new google.maps.Size(20, 20), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
          }
        }; 

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public geolocation: Geolocation,
		public modalCtrl: ModalController,
        public loadingController:LoadingController,
        public hotelsProvider: HotelsProvider) {
	}

	ngOnInit() {
       console.log('ngOnInit');
       this.loading = document.getElementById("loaderoverlay");
       /*this.loadingController.create({
        spinner: 'hide',
        content: `
          <div class="custom-spinner-container">
            <div class="custom-spinner-box"></div>
          </div>`
       });*/

      // this.loading.onDidDismiss(() => {
      //   console.log('Dismissed loading');
      // });

      this.loading.style.display="block";
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
		var mapStyles =[
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "hue": "#50a5d1"
                },
                {
                    "saturation": 50
                },
                {
                    "gamma": 0
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#333333"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#333333"
                },
                {
                    "weight": 0.5
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "saturation": 50
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "invert_lightness": true
                },
                {
                    "color": "#000000"
                },
                {
                    "weight": 0.1
                },
                {
                    "saturation": -100
                },
                {
                    "lightness": -100
                },
                {
                    "gamma": 0.01
                }
            ]
        }
    ];
    let mapOptions = {
      center: this.userLocation,
      zoom: 13,
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
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(this.map);
	}

	private mapLoaded(location){
        this.addSourceMarker(true,location);
        // let loader = this.loadingController.create({
        // 	content:"Fetching Hotels..."
        // });

        //loader.present().then(()=>{
            this.hotelsProvider.load().then(data => {
              this.hotelsInfo = data;
              if(this.hotelsInfo !== undefined && this.hotelsInfo.length !== 0){
               //this.displayDirection(this.hotelsInfo[0].lattitue,this.hotelsInfo[0].longitude);
               for(let hotel of this.hotelsInfo) {
                  var hotelLocation = new google.maps.LatLng(hotel.latitude, hotel.longitude);
                  this.sourceMarker = new google.maps.Marker({
                  position: hotelLocation,
                  map: this.map,
                  icon:this.icons.hotel
                });
                }
              }
              //loader.dismiss();
              this.loading.style.display="none";
            });
        //});
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
  			// title: 'Drage me!',
  			// draggable:true,
  			icon:this.icons.userloc
  		});
      // google.maps.event.addListener(this.sourceMarker,'dragend',this.sourceMarkerDragEnd.bind(this));
    }
	
	private sourceMarkerDragEnd(event){
	    console.log('Marker:DragEnd:lat:'+event.latLng.lat()+' lng:'+event.latLng.lng());
      this.userLocation = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
      this.map.panTo(this.userLocation);
	}
	
	compasClicked(){
    if (this.map !== undefined) {
      // this.addMarker(false,this.location);
      let options = {enableHighAccuracy: true};
      this.geolocation.getCurrentPosition(options).then((res) => {
          console.log(res);
          this.userLocation = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
          this.map.panTo(this.userLocation);
          // if(this.destinationLocation !== undefined){
             // this.sourceMarker.setMap(null);
             // this.displayRoute(this.userLocation,this.destinationLocation,this.directionsService,this.directionsDisplay);
          // }else{
              this.addSourceMarker(false,this.userLocation);    
          // }
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
                // if(self.destinationLocation !== undefined){
                   // self.sourceMarker.setMap(null);
                   //self.displayRoute(place.geometry.location,self.destinationLocation,self.directionsService,self.directionsDisplay);
                // }else{
                    self.addSourceMarker(false,place.geometry.location);
                // }
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
        //if(this.sourceMarker !== undefined){
        //    this.sourceMarker.setMap(null);
        //}
        // this.destinationLocation = new google.maps.LatLng(Lat, Lng);
        // this.displayRoute(this.userLocation,this.destinationLocation,this.directionsService,this.directionsDisplay);
    }
}
