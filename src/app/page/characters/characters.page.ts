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
  activeToggles: string[] = [];


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
    let filteredList = this.characters.filter((character) =>
      character.name.toLowerCase().includes(this.searchText.toLowerCase())
    );

    if (this.activeToggles.length > 0) {
      filteredList = filteredList.sort((a, b) => {
        for (const toggle of this.activeToggles) {
          const propA = a[toggle];
          const propB = b[toggle];

          if (typeof propA === 'string' && typeof propB === 'string') {
            const comparison = propA.localeCompare(propB);
            if (comparison !== 0) {
              return comparison;
            }
          }

          if (typeof propA === 'number' && typeof propB === 'number') {
            const comparison = propA - propB;
            if (comparison !== 0) {
              return comparison;
            }
          }
        }
        return a.name.localeCompare(b.name);
      });
    } else {
      filteredList = filteredList.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filteredList;
  }
  public toggleOrder(toggle: string) {
    const index = this.activeToggles.indexOf(toggle);
    if (index === -1) {
      this.activeToggles.push(toggle);
    } else {
      this.activeToggles.splice(index, 1);
    }
  }


}