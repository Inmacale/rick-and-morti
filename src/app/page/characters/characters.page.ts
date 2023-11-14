import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { CharactersDataManagementService } from 'src/app/service/characters-data-management.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  characters: any[] = [];
  nextPage: string = "";
  results: any | undefined;

  constructor(private alertController: AlertController, private characterdatamanagement: CharactersDataManagementService) { }

  ngOnInit() {
    this.chargePageCharacters();
    this.results = this.characters;
  }


  async toggleFavorite(character: any) {
    if (this.isFavorite(character)) {
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
              this.characterdatamanagement.deleteFavoriteList(character);
              console.log('Ítem borrado:');
            }
          }
        ]
      });

      await alert.present();

    } else {
      this.characterdatamanagement.addFavoriteList(character);
    }
  }

  async chargePageCharacters(path?: string) {
    const pageCharacter = await this.characterdatamanagement.getCharactersFindAll(path);
    const listCharacterPage = pageCharacter.results;
    this.nextPage = pageCharacter.info.next;
    this.characters = this.characters.concat(listCharacterPage);
  }

  public onIonInfinite(ev: any) {
    this.chargePageCharacters(this.nextPage);
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  public isFavorite(item: any): boolean {
    return this.characterdatamanagement.isFavorite(item);
  }

  public handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.characters.filter((character) => character.name.toLowerCase().indexOf(query) > -1);

  }


}