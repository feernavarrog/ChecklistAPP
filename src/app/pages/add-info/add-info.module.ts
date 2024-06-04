import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInfoPageRoutingModule } from './add-info-routing.module';

import { AddInfoPage } from './add-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddInfoPageRoutingModule
  ],
  declarations: [AddInfoPage]
})
export class AddInfoPageModule {}
