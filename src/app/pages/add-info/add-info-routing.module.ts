import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddInfoPage } from './add-info.page';

const routes: Routes = [
  {
    path: '',
    component: AddInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddInfoPageRoutingModule {}
