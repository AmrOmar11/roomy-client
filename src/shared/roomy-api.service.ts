import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import "rxjs";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoomyApi{

	currentTourney:any={};
	
	private baseUrl = 'https://project-roomy.firebaseio.com/';
	constructor(private http: Http) {
		
	}
	getTournaments(){
		return new Promise(resolve =>{
			this.http.get(`${this.baseUrl}/tournaments.json`)
			.subscribe(res => resolve(res.json()));
		});
	}
	getTourneyData(tourneyId):Observable<any>{
		return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
		.map((response:Response)=>{
			this.currentTourney = response.json();
			return this.currentTourney;
		});
	}
}