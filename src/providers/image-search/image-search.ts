import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ImageSearchProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ImageSearchProvider {
	appid = "fgQ7ve/sV/eB3NN/+fDK9ohhRWj1z1us4eIbidcsTBM";
  	rooturl = "https://api.datamarket.azure.com/Bing/Search/v1/Image?$format=json&Query='";
  	
  	constructor(public http: Http) {
    	console.log('Hello ImageSearchProvider Provider');
  	}
  	search(term:string) {

      let url = this.rooturl + encodeURIComponent(term) + "'&$top=10";

      let headers = new Headers();
      headers.append('Authorization', 'Basic '+ btoa(this.appid + ':' + this.appid));
      return this.http.get(url,{headers:headers})
        .map(res => res.json())
        .map(data => data.d.results);          
  	}

}
