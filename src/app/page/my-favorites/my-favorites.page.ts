import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CharactersDataManagementService } from 'src/app/service/characters-data-management.service';


@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.page.html',
  styleUrls: ['./my-favorites.page.scss'],
})
export class MyFavoritesPage implements OnInit {

  constructor(private alertController: AlertController, private navCtrl: NavController, private characterdatamanagement: CharactersDataManagementService ) { }

  ngOnInit() {
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

  navigateToCharacters() {
    this.navCtrl.navigateForward('/characters');
  }

  getFavoriteList(): any[] {
    return this.characterdatamanagement.getFavoriteList();
  }
}
