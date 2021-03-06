import { Component, ViewChild, Input,Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

/**
 * penerated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'inline-picker',
  templateUrl: 'inlinepicker.html'
})
export class InlinePicker {
  @ViewChild('hours') hours: Slides;
  @ViewChild('minutes') minutes: Slides;
  minAr : string[] = [];
  hoursAr : string[] = [];
  @Input() minDuration : number;
  @Input() maxDuration : number;
  @Output() timePicked : EventEmitter<any> = new EventEmitter();
  slideChanged(){
    console.log('slide changed');
    let hrIndex = this.hours.getActiveIndex();
    if(hrIndex == undefined){
      hrIndex = 0;
    }
    if(hrIndex == this.hoursAr.length - 1){
      this.minutes.slideTo(0);
      this.minutes.lockSwipes(true);
    }else{
      this.minutes.lockSwipes(false);
    }
    let mnIndex = this.minutes.getActiveIndex();
    if(mnIndex == undefined){
      mnIndex = 0;
    }    
    console.log(`hours ${this.hoursAr[hrIndex]} index ${hrIndex
    }, minutes ${this.minAr[mnIndex]}`)
     this.timePicked.emit({'hours':this.hoursAr[hrIndex],'mins':this.minAr[mnIndex]})
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ngAfterViewInit() {
    for(let i=this.minDuration; i<= this.maxDuration;i++){
      this.hoursAr.push(String(i));
    }
    for(let i=0;i<60;i++){
      if(i < 10){
        this.minAr.push('0' + String(i)); 
      }else{
        this.minAr.push(String(i));
      }
    }
    this.hours.freeMode = true;
    this.hours.initialSlide = 0;
    this.hours.direction = 'vertical';
    this.hours.loop= false;
    this.hours.speed = 300;
    this.hours.freeMode = true;
    this.hours.freeModeSticky = true;
    this.hours.slidesPerView = 4;
    this.hours.spaceBetween = 20;
    this.hours.centeredSlides = true;
    this.minutes.freeMode = true;
    this.minutes.initialSlide = 0;
    this.minutes.direction = 'vertical';
    this.minutes.loop= false;
    this.minutes.speed = 300;
    this.minutes.freeMode = true;
    this.minutes.freeModeSticky = true;
    this.minutes.slidesPerView = 4;
    this.minutes.spaceBetween = 20;
    this.minutes.centeredSlides = true;
  }
  
  isHActive(index){
    if(index == this.hours.getActiveIndex()){
      return true;
    }else{
      return false;
    }
  }
  
  isMActive(index){
    if(index == this.minutes.getActiveIndex()){
      return true;
    }else{
      return false;
    }
  }

  ionViewDidLoad() {
    console.log(this.hoursAr);
    console.log(this.minAr);
  }
}
