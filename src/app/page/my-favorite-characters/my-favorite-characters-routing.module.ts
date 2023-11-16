import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyFavoriteCharactersPage } from './my-favorite-characters.page';

const routes: Routes = [
  {
    path: '',
    component: MyFavoriteCharactersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyFavoriteCharactersPageRoutingModule {}
