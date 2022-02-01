import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { GoogleChartsModule } from 'angular-google-charts';

import { AgmCoreModule } from '@agm/core';

import { MappaitalyComponentModule } from '../components/mappaitaly/mappaitaly.component.module';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    GoogleChartsModule,
    MappaitalyComponentModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey
    })
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
