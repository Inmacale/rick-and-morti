import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { DataManagementService } from 'src/app/service/data-management.service';

@Component({
    template: '',
})
export abstract class ListsAbstractPage {


    nextPage: number = 1;
    maxNumberPages: number = 1;
    searchText: string = '';
    activeToggles: string[] = [];

    items: any[] = [];
    sortByOptions: { key: string, active?: boolean }[] = [];


    constructor(protected alertController: AlertController, protected datamanagement: DataManagementService) { }


    abstract getPathResource(): string;


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
                            this.datamanagement.deleteFavoriteList(item);
                            console.log('Ítem borrado:');
                        }
                    }
                ]
            });

            await alert.present();

        } else {
            this.datamanagement.addFavoriteList(item);
        }
    }

    async chargePageItems(params?: any) {
        const page = await this.datamanagement.getFindAll(this.getPathResource(), params);
        this.maxNumberPages = page.info.pages;
        this.items = this.items.concat(page.results);
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
        return this.datamanagement.isFavorite(item);
    }

    public getList(): any[] {
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