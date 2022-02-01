import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MappaitalyComponent } from './mappaitaly.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [MappaitalyComponent],
  exports: [MappaitalyComponent]
})
export class MappaitalyComponentModule {}