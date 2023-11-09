import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.page.html',
  styleUrls: ['./my-favorites.page.scss'],
})
export class MyFavoritesPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async deleteItem(event: any, x: any) {
    console.log(event)
    const slidingItem = event.target.closest('ion-item-sliding');
    slidingItem.close();

    const alert = await this.alertController.create({
      header: 'Confirmar borrado',
      message: `¿Estás seguro de que quieres borrar ${x}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Borrar',
          handler: () => {
            // Aquí va la lógica para borrar el ítem
            console.log('Ítem borrado:', x);
          }
        }
      ]
    });

    await alert.present();
  }
}
