import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CharactersDataManagementService } from 'src/app/service/characters-data-management.service';


@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.page.html',
  styleUrls: ['./my-favorites.page.scss'],
})
export class MyFavoritesPage implements OnInit {

  favorites: any[] | undefined;

  constructor(private alertController: AlertController, private navCtrl: NavController, private characterdatamanagement: CharactersDataManagementService) { }

  ngOnInit() {
    this.favorites = this.getFavoriteList();
  }

  async deleteItem(event: any, character: any) {
    console.log(event)
    const slidingItem = event.target.closest('ion-item-sliding');
    slidingItem.close();

    const alert = await this.alertController.create({
      header: 'Confirmar borrado',
      message: `¿Estás seguro de que quieres borrar ${character}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Borrar',
          handler: () => {
            this.characterdatamanagement.deleteFavoriteList(character);
            // Aquí va la lógica para borrar el ítem
            console.log('Ítem borrado:', character);
          }
        }
      ]
    });

    await alert.present();
  }

  public navigateToCharacters() {
    this.navCtrl.navigateForward('/characters');
  }

  public getFavoriteList(): any[] {
    return this.characterdatamanagement.getFavoriteList();
  }

  public handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.favorites = this.getFavoriteList().filter((character) => character.name.toLowerCase().indexOf(query) > -1);

  }


}
