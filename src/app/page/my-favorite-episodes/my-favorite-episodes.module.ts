import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyFavoriteEpisodesPageRoutingModule } from './my-favorite-episodes-routing.module';

import { MyFavoriteEpisodesPage } from './my-favorite-episodes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyFavoriteEpisodesPageRoutingModule
  ],
  declarations: [MyFavoriteEpisodesPage]
})
export class MyFavoriteEpisodesPageModule {}
