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
      }

    ]
  },
  {
    path: 'profile',
    loadChildren: () => import('./page/profile/profile.module').then(m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
