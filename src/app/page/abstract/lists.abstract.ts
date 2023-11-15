import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { CharacterDto } from 'src/app/model/character';
import { CharactersDataManagementService } from 'src/app/service/characters-data-management.service';

@Component({
    selector: 'app-characters',
    template: '',
})
export class ListsAbstractPage implements OnInit {


    nextPage: number = 1;
    maxNumberPages: number = 1;
    searchText: string = '';
    activeToggles: string[] = [];

    items: any[] = [];
    sortByOptions: { key: string, active?: boolean }[] = [];


    constructor(private alertController: AlertController, private characterdatamanagement: CharactersDataManagementService) { }

    ngOnInit() {
        this.chargePageItems();
    }


    async toggleFavorite(item: any) {
        if (this.isFavorite(item)) {
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
                            this.characterdatamanagement.deleteFavoriteList(item);
                            console.log('Ítem borrado:');
                        }
                    }
                ]
            });

            await alert.present();

        } else {
            this.characterdatamanagement.addFavoriteList(item);
        }
    }

    async chargePageItems(params?: any) {
        const pageCharacter = await this.characterdatamanagement.getCharactersFindAll(params);
        this.maxNumberPages = pageCharacter.info.pages;
        this.items = this.items.concat(pageCharacter.results);
    }

    public onIonInfinite(ev: InfiniteScrollCustomEvent) {
        if (this.maxNumberPages > this.nextPage + 1) {
            this.nextPage++;
            this.chargePageItems({ page: this.nextPage });
        }
        setTimeout(() => {
            ev.target.complete();
        }, 500);
    }

    public isFavorite(item: any): boolean {
        return this.characterdatamanagement.isFavorite(item);
    }

    public getCharactersList(): any[] {
        const sortByKey = this.sortByOptions.find(e => e.active === true);

        return this.items.filter((item) =>
            item.name.toLowerCase().includes(this.searchText.toLowerCase())
        ).sort((a, b) => {
            return sortByKey ? (a[sortByKey.key] as string).localeCompare((b[sortByKey.key] as string)) : 0;
        });
    }

    public toggleOrder(toggle: { key: string, active?: boolean }): void {
        this.sortByOptions.forEach((e) => e.active = e.key === toggle.key ? !toggle.active : false);
    }


}