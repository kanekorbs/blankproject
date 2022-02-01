import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { GoogleChartsModule } from 'angular-google-charts';

import { AgmCoreModule } from '@agm/core';

import { MappaitalyComponentModule } from '../components/mappaitaly/mappaitaly.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    GoogleChartsModule,
    MappaitalyComponentModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxkK3dgBZImZK2RDqBI2XuzFFoE_wx4oY'
    })
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
