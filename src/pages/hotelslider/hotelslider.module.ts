import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelsliderPage } from './hotelslider';

@NgModule({
  declarations: [
    HotelsliderPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelsliderPage),
  ],
  exports: [
    HotelsliderPage
  ]
})
export class HotelsliderPageModule {}
