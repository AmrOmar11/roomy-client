import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelinfoPage } from './hotelinfo';

@NgModule({
  declarations: [
    HotelinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(HotelinfoPage),
  ],
  exports: [
    HotelinfoPage
  ]
})
export class HotelinfoPageModule {}
