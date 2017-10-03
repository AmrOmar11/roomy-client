import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DurationPage } from './duration';

@NgModule({
  declarations: [
    DurationPage,
  ],
  imports: [
    IonicPageModule.forChild(DurationPage),
  ],
})
export class DurationPageModule {}
