import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CharacterDto } from 'src/app/model/character';
import { CharactersDataManagementService } from 'src/app/service/characters-data-management.service';


@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.page.html',
  styleUrls: ['./my-favorites.page.scss'],
})
export class MyFavoritesPage implements OnInit {


  searchText: string = '';

  constructor(private alertController: AlertController, private navCtrl: NavController, private characterdatamanagement: CharactersDataManagementService) { }

  ngOnInit() {
    this.getFavoriteList();
  }

  async deleteItem(event: any, character: CharacterDto) {
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

  public getFavoriteList(): CharacterDto[] {
    return this.characterdatamanagement.getFavoriteList().filter((character) => character.name.toLowerCase().includes(this.searchText.toLocaleLowerCase()));
  }




}
