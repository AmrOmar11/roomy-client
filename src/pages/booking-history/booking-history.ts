import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';

/**
 * Generated class for the BookingHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-history',
  templateUrl: 'booking-history.html',
})
export class BookingHistoryPage {
	public bookingslist:any;
	public hideCard:any = true;	
    public hideSlide:any = false;
	constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
		var _this = this;
		this.getBookingHistory().then(function(res){
			_this.bookingslist = res;
			var bookingKeys = Object.keys(_this.bookingslist);
			if(bookingKeys.length > 0){
				_this.hideCard = true;
				_this.hideSlide = false;
			}else{
				_this.hideSlide = true;
				_this.hideCard = false;
			}
		})
	}

	ionViewDidLoad() {
	//console.log('ionViewDidLoad BookingHistoryPage');
	}

	getBookingHistory(){
		return new Promise(resolve =>{
	      this.http.get(`assets/data/BookingHistory.json`)
	      .subscribe(res => resolve(res.json()));
	    });
	}

	getRating(rating){
      let ratingString = '';
      rating = parseInt(rating);
      if(rating == undefined || rating <= 3)
      {
        ratingString = "three";
      }else if(rating == 5)
      {
        ratingString = "five";
      }else if(rating == 7)
      {
        ratingString = "seven";
      }
      return ratingString;
    }

}
