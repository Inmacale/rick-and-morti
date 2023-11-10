import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CharactersDataManagementService } from 'src/app/service/characters-data-management.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  isFavorite: boolean = false;
  characters: any[] | undefined;

  constructor(private alertController: AlertController, private characterdatamanagement: CharactersDataManagementService) { }

  ngOnInit() {
    this.chargeListCharacters();
  }


  async toggleFavorite() {
    if (this.isFavorite) {
      const alert = await this.alertController.create({
        header: 'Quitar favorito',
        message: `¿Estás seguro de que quieres quitar como favorito?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          }, {
            text: 'Eliminar',
            handler: () => {
              this.isFavorite = !this.isFavorite;
              // Aquí va la lógica para borrar el ítem
              console.log('Ítem borrado:');
            }
          }
        ]
      });

      await alert.present();

    } else {
      this.isFavorite = !this.isFavorite;
    }
  }

  async chargeListCharacters() {
    const res = await this.characterdatamanagement.listCharacters();
    this.characters = res;
  }



}