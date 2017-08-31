import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/Rx';

/*
  Generated class for the HotelsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HotelsProvider {

  data:any;
  constructor(public http: Http) {
  }

  public load() {
	  return new Promise(resolve => {
	    // We're using Angular HTTP provider to request the data,
	    // then on the response, it'll map the JSON data to a parsed JS object.
	    // Next, we process the data and resolve the promise with the new data.
	    this.http.get('assets/data/hotels.json')
	      .map(res => res.json())
	      .subscribe(data => {
	        // we've got back the raw data, now generate the core schedule data
	        // and save the data for later reference
	        this.data = data.hotels;
	        resolve(this.data);
	      });
	  });
	}

  	public getHotelDetailedInfo() {
	  return new Promise(resolve => {
	    // We're using Angular HTTP provider to request the data,
	    // then on the response, it'll map the JSON data to a parsed JS object.
	    // Next, we process the data and resolve the promise with the new data.
	    this.http.get('assets/data/hotel_detailed_info.json')
	      .map(res => res.json())
	      .subscribe(data => {
	        // we've got back the raw data, now generate the core schedule data
	        // and save the data for later reference
	        this.data = data;
	        resolve(this.data);
	      });
	  });
	}

	public getHotels(inputData) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json' );
		let options = new RequestOptions({ headers: headers });
		let body = JSON.stringify(inputData);
		console.log('HotelsbyLocation:req:');
		return this.http.post('https://roomy-midtier.herokuapp.com/getHotelsbyLocation',body,options)
		.map(res => {
			console.log('HotelsbyLocation:res:');
			console.log(res.json());
			return res.json();
		})
		.catch(this.handleError);
	}

	public getHotelDetails(inputData) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json' );
		let options = new RequestOptions({ headers: headers });
		let body = JSON.stringify(inputData);
		console.log('HotelDetails:req:'+inputData.hotelId);
		return this.http.post('https://roomy-midtier.herokuapp.com/getHotelDetails',body,options)
		.map(res => {
			console.log('HotelDetails:res:');
			console.log(res.json());
			return res.json();
		})
		.catch(this.handleError);
	}
	  
	handleError(error) {
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}

}
