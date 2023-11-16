import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FooterButtonComponent } from './component/footer-button/footer-button.component';


const routes: Routes = [

  {
    path: '',
    component: FooterButtonComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-favorites',
        pathMatch: 'full'
      },


      {
        path: 'my-favorites',
        loadChildren: () => import('./page/my-favorites/my-favorites.module').then(m => m.MyFavoritesPageModule)
      },
      {
        path: 'characters',
        loadChildren: () => import('./page/characters/characters.module').then(m => m.CharactersPageModule)
      },
      {
        path: 'episodes',
        loadChildren: () => import('./page/episode/episode.module').then(m => m.EpisodePageModule)
      },
      {
        path: 'my-favorite-characters',
        loadChildren: () => import('./page/my-favorite-characters/my-favorite-characters.module').then(m => m.MyFavoriteCharactersPageModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./page/location/location.module').then(m => m.LocationPageModule)
      },

    ]
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./page/profile/profile.module').then(m => m.ProfilePageModule)
  },  {
    path: 'my-favorite-episodes',
    loadChildren: () => import('./page/my-favorite-episodes/my-favorite-episodes.module').then( m => m.MyFavoriteEpisodesPageModule)
  },







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
