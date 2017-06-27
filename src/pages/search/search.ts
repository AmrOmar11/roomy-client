import { Component, OnInit, NgZone,Directive, Renderer, ElementRef } from '@angular/core';
import { ViewController } from 'ionic-angular';

declare var google: any;

@Component({
    selector : 'search',
    templateUrl: 'search.html'
})
@Directive({
  selector : '[focuser]'
})
export class SearchPage implements OnInit{

    autocompleteItems: any;
    autocomplete: any;
    acService:any;
    placesService: any;

    constructor(public viewCtrl: ViewController,
        private zone:NgZone,
        public renderer: Renderer,
        public elementRef: ElementRef) { 
    }

    ngOnInit() {
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
    }
    
    ngAfterViewInit() {
        console.log('ngAfterViewInit');        
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

    chooseItem(item: any) {
        console.log('modal > chooseItem > item > ', item);
        this.viewCtrl.dismiss(item);
    }

    updateSearch() {
        console.log('modal > updateSearch');
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        let self = this;
        let config = { 
            // types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
            input: this.autocomplete.query
        }
        this.acService.getPlacePredictions(config, function (predictions, status) {
            console.log('modal > getPlacePredictions > status > ', status);
            self.autocompleteItems = [];
            self.zone.run(function(){
                predictions.forEach(function (prediction) {
                    self.autocompleteItems.push(prediction);
                });
            });
        });
    }

}
