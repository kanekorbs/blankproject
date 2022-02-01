import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HoteldettailsPage } from './hoteldettails.page';

const routes: Routes = [
  {
    path: '',
    component: HoteldettailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoteldettailsPageRoutingModule {}
