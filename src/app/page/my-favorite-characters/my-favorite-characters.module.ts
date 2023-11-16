import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyFavoriteCharactersPageRoutingModule } from './my-favorite-characters-routing.module';

import { MyFavoriteCharactersPage } from './my-favorite-characters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyFavoriteCharactersPageRoutingModule
  ],
  declarations: [MyFavoriteCharactersPage]
})
export class MyFavoriteCharactersPageModule {}
