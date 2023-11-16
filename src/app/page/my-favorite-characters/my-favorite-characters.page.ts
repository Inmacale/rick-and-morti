import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CharacterDto } from 'src/app/model/character';
import { DataManagementService } from 'src/app/service/data-management.service';

@Component({
  selector: 'app-my-favorite-characters',
  templateUrl: './my-favorite-characters.page.html',
  styleUrls: ['./my-favorite-characters.page.scss'],
})
export class MyFavoriteCharactersPage implements OnInit {



  searchText: string = '';

  constructor(private alertController: AlertController, private navCtrl: NavController, private characterdatamanagement: DataManagementService) { }

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
