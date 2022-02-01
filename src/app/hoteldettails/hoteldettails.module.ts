import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HoteldettailsPageRoutingModule } from './hoteldettails-routing.module';

import { HoteldettailsPage } from './hoteldettails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HoteldettailsPageRoutingModule
  ],
  declarations: [HoteldettailsPage]
})
export class HoteldettailsPageModule {}
