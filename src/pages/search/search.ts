import { Component, OnInit, NgZone,Directive, Renderer, ElementRef } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

declare var google: any;
@Component({
    selector : 'search',
    templateUrl: 'search.html'
})
export class SearchPage implements OnInit{

    autocompleteItems: any;
    autocomplete: any;
    acService:any;
    placesService: any;
    places:any;
    hideDefinedlist:any=false;

    constructor(public viewCtrl: ViewController,
        private zone:NgZone,
        public renderer: Renderer,
        public elementRef: ElementRef) {

        this.places=[{name:"Hyderabad, Telangana",subtext: "Starting at Rs. 5/min"},
                     {name:"Vijayawada, Andhra Pradesh",subtext: "Starting at Rs. 5/min"},
                     {name:"Chennai, Tamilnadu",subtext: "Starting at Rs. 5/min"}
        ]
    }

    ngOnInit() {
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
    }
    
    ngAfterViewInit() {
        //console.log('ngAfterViewInit');        
        //search bar is wrapped with a div so we get the child input
        let searchInput = this.elementRef.nativeElement.querySelector('input');
        if (!searchInput) {
            searchInput = this.elementRef.nativeElement.querySelector('textarea');
        }
        setTimeout(() => {
          //delay required or ionic styling gets finicky
          this.renderer.invokeElementMethod(searchInput, 'focus', []);
        }, 500);
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    clear() {
        // console.log(this.hideDefinedlist);
        this.hideDefinedlist =  false;
    }

    chooseItem(item: any) {
        //console.log('modal > chooseItem > item > ', item);
        // this.hideDefinedlist =  false;
        // console.log(this.hideDefinedlist);
        this.viewCtrl.dismiss(item);
    }

    definedItemSelected(place){
        let searchItems:any;
        this.autocomplete.query = place.name;
        let self = this;
        let config = { 
            componentRestrictions: { country: 'IN' },
            input: this.autocomplete.query
        }
        this.acService.getPlacePredictions(config, function (predictions, status) {
            self.zone.run(function(){
                searchItems = [];
                predictions.forEach(function (prediction) {
                    searchItems.push(prediction);
                });
                if(searchItems.length>0){
                    self.chooseItem(searchItems[0]);
                }
            });
        });
    }

    updateSearch() {
        //console.log('modal > updateSearch');
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            this.hideDefinedlist =  false;
            return;
        }else{
            this.hideDefinedlist =  true;                        
        }
        let self = this;
        let config = { 
            componentRestrictions: { country: 'IN' },
            // types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
            input: this.autocomplete.query
        }
        this.acService.getPlacePredictions(config, function (predictions, status) {
            //console.log('modal > getPlacePredictions > status > ', status);
            self.autocompleteItems = [];
            self.zone.run(function(){
                predictions.forEach(function (prediction) {
                    self.autocompleteItems.push(prediction);
                });
            });
        });
    }

}