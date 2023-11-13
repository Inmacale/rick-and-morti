import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { CharactersDataManagementService } from 'src/app/service/characters-data-management.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  isFavorite: boolean = false;
  characters: any[] = [];
  nextPage: string = "";

  constructor(private alertController: AlertController, private characterdatamanagement: CharactersDataManagementService) { }

  ngOnInit() {
    this.chargePageCharacters();
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

  async chargePageCharacters(path?: string) {
    const pageCharacter = await this.characterdatamanagement.getCharactersFindAll(path);
    const listCharacterPage = pageCharacter.results;
    this.nextPage = pageCharacter.info.next;
    this.characters = this.characters.concat(listCharacterPage);
  }

  onIonInfinite(ev: any) {
    this.chargePageCharacters(this.nextPage);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }


}