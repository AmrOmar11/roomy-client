import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetModalPage } from './forget-modal';

@NgModule({
  declarations: [
    ForgetModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetModalPage),
  ],
  exports: [
    ForgetModalPage
  ]
})
export class ForgetModalPageModule {}
