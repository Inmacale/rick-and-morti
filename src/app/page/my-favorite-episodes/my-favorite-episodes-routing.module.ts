import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyFavoriteEpisodesPage } from './my-favorite-episodes.page';

const routes: Routes = [
  {
    path: '',
    component: MyFavoriteEpisodesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyFavoriteEpisodesPageRoutingModule {}
