import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { CharacterDto } from 'src/app/model/character';
import { CharactersDataManagementService } from 'src/app/service/characters-data-management.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {

  characters: CharacterDto[] = [];
  nextPage: number = 1;
  maxNumberPages: number = 1;
  searchText: string = '';

  constructor(private alertController: AlertController, private characterdatamanagement: CharactersDataManagementService) { }

  ngOnInit() {
    this.chargePageCharacters();
  }


  async toggleFavorite(character: CharacterDto) {
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

  async chargePageCharacters(params?: any) {
    const pageCharacter = await this.characterdatamanagement.getCharactersFindAll(params);
    this.maxNumberPages = pageCharacter.info.pages;
    this.characters = this.characters.concat(pageCharacter.results);
  }

  public onIonInfinite(ev: any) {
    if (this.maxNumberPages > this.nextPage + 1) {
      this.nextPage++;
      this.chargePageCharacters({ page: this.nextPage });
    }
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  public isFavorite(item: any): boolean {
    return this.characterdatamanagement.isFavorite(item);
  }

  public getCharactersList(): CharacterDto[] {
    return this.characters.filter((character) => character.name.toLowerCase().includes(this.searchText.toLowerCase()))
  }


}